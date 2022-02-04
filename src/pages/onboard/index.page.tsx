import { Box, Container, Button, Spinner, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { borderStyles } from "@/common/theme";
import {
  IntroContent,
  Skills,
  Topics,
} from "@/components/FormComponents/Forms";
import * as Yup from "yup";
import { CompletionBar } from "@/components/FormComponents/CompletionBar";
import { useAccount, useConnect } from "wagmi";
import Router from "next/router";
import { CompletedFormContent } from "@/components/FormComponents/CompletedFormContent";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { CREATE_RESPONSES } from "@/services/Apollo/Mutations";
const Onboard: NextPage = () => {
  const [
    {
      data: { connected },
      loading,
    },
  ] = useConnect();
  const [{ data }] = useAccount({ fetchEns: true });
  const [showPage, setShowPage] = useState(false);
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [IntroContent, Skills, Topics];
  const currentForm = steps[currentStep];
  const currentValidationSchema = currentForm?.validation;
  const initialValues = steps.reduce((accValues, currStep) => {
    return {
      ...accValues,
      ...(currStep.initialValue && { ...currStep.initialValue }),
    };
  }, {});
  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    if (!loading && !connected) {
      Router.push("/");
      setShowPage(false);
    } else if (
      currentStep === 0 &&
      localStorage.getItem(`diamond-storage-${data?.address}`) !== null
    ) {
      setShowPage(false);
      Router.push("/");
    } else {
      setShowPage(true);
    }
  }, [data, connected, loading, currentStep]);

  const [addResponses] = useMutation(CREATE_RESPONSES);
  const submitForm = async (values: any, actions: any) => {
    const answers = {
      ...values,
    };
    try {
      await addResponses({
        variables: {
          input: Object.keys(answers).reduce((inputArray, formKey) => {
            return [
              ...inputArray,
              ...answers[formKey].map((response) => ({
                text: response,
                prompt: {
                  connect: { where: { node: { uuid: formKey } } },
                },
                wallet: {
                  connectOrCreate: {
                    where: { node: { address: data?.address } },
                    onCreate: { node: { address: data?.address } },
                  },
                },
              })),
            ];
          }, []),
        },
      });
      toast({
        title: "Answers submitted",
        description: "Welcome to Chainverse!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "There was an error in your submission.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    actions.setSubmitting(false);
    setCurrentStep((step) => ++step);
  };

  const submitHandler = (values: any, actions: any) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      actions.setTouched({});
      actions.setSubmitting(false);
      setCurrentStep((step) => ++step);
    }
  };
  const backHandler = () => {
    setCurrentStep((step) => --step);
  };
  return (
    <>
      {!showPage && <Box>loading...</Box>}
      {showPage && (
        <Box height="100vh" display="flex" justifyContent="center">
          <Container
            width="100%"
            position="absolute"
            maxW={"container.md"}
            mt="40px"
            display={["none", null, "unset"]}
          >
            <CompletionBar
              stepArray={steps.map((i) => i.navTitle ?? i.formTitle)}
              currentStep={currentStep}
            />
          </Container>
          <Container
            position="absolute"
            width="100%"
            maxW={"container.md"}
            height="100vh"
          >
            <Box
              display="flex"
              flexDir="column"
              alignItems="center"
              pt="100px"
              minH="100%"
            >
              <Box
                p="40px"
                minH="400px"
                height="100%"
                width="100%"
                mb="10px"
                display="flex"
                flexDir="column"
                justifyContent="space-between"
                {...borderStyles}
              >
                {currentStep === steps.length ? (
                  <>
                    <CompletedFormContent />
                    <Box mt="20px" display="flex" justifyContent="flex-end">
                      <Link href="/discover" passHref>
                        <Button
                          bg="diamond.blue.3"
                          textDecoration={"none"}
                          color="diamond.white"
                          _hover={{ bg: "diamond.blue.3" }}
                          variant="solid"
                          href=""
                        >
                          Go to home page
                        </Button>
                      </Link>
                    </Box>
                  </>
                ) : (
                  <Formik
                    initialValues={initialValues}
                    onSubmit={submitHandler}
                    validationSchema={
                      currentValidationSchema || Yup.object().shape({})
                    }
                  >
                    {({ isSubmitting }) => {
                      return (
                        <Form
                          style={{ height: "100%" }}
                          id={currentForm.formId}
                        >
                          <Box
                            display="flex"
                            flexDir="column"
                            height="100%"
                            justifyContent="space-between"
                          >
                            <Box>{currentForm.component}</Box>

                            <Box
                              display="flex"
                              justifyContent="flex-end"
                              mt="10px"
                            >
                              {currentStep !== 0 && (
                                <Button
                                  onClick={backHandler}
                                  bg="diamond.blue.2"
                                  _hover={{ bg: "diamond.blue.2" }}
                                  color="diamond.white"
                                  variant="solid"
                                  mr="10px"
                                >
                                  Back
                                </Button>
                              )}
                              <Button
                                type="submit"
                                disabled={isSubmitting}
                                bg="diamond.blue.3"
                                color="diamond.white"
                                _hover={{ bg: "diamond.blue.3" }}
                                variant="solid"
                              >
                                {isLastStep ? "Submit" : "Continue"}
                              </Button>
                            </Box>
                          </Box>
                        </Form>
                      );
                    }}
                  </Formik>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Onboard;
