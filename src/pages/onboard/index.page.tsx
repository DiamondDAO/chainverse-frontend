import { Box, Container, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import React, { useState } from "react";
import { borderStyles } from "@/theme";
import {
  Welcome,
  Skills,
  Topics,
  Intro,
  Contact,
} from "@/components/FormComponents/Forms";
import * as Yup from "yup";
import { CompletionBar } from "@/components/FormComponents/CompletionBar";
import { useAccount } from "wagmi";
import { CompletedFormContent } from "@/components/FormComponents/CompletedFormContent";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { CREATE_RESPONSES } from "@/services/Apollo/Mutations";
const Onboard: NextPage = () => {
  const [{ data }] = useAccount({ fetchEns: true });
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [Welcome, Contact];
  const currentForm = steps[currentStep];
  const currentValidationSchema = currentForm?.validation;
  const initialValues = steps.reduce((accValues, currStep) => {
    return {
      ...accValues,
      ...(currStep.initialValue && { ...currStep.initialValue }),
    };
  }, {});
  const isLastStep = currentStep === steps.length - 1;

  const [addResponses] = useMutation(CREATE_RESPONSES);
  const submitForm = async (values: any, actions: any) => {
    const answers = {
      ...values,
    };
    try {
      await addResponses({
        variables: {
          input: Object.keys(answers).reduce((inputArray, formKey) => {
            switch (typeof answers[formKey]) {
              case "object":
                return [
                  ...inputArray,
                  ...answers[formKey].map((response) => ({
                    text: response,
                    prompt: {
                      connectOrCreate: {
                        where: { node: { text: formKey } },
                        onCreate: { node: { text: formKey, type: "SURVEY" } },
                      },
                    },
                    wallet: {
                      connectOrCreate: {
                        where: { node: { address: data?.address } },
                        onCreate: { node: { address: data?.address } },
                      },
                    },
                  })),
                ];
              case "string":
              case "boolean":
              default:
                return [
                  ...inputArray,
                  {
                    text: String(answers[formKey]),
                    prompt: {
                      connectOrCreate: {
                        where: { node: { text: formKey } },
                        onCreate: { node: { text: formKey, type: "SURVEY" } },
                      },
                    },
                    wallet: {
                      connectOrCreate: {
                        where: { node: { address: data?.address } },
                        onCreate: { node: { address: data?.address } },
                      },
                    },
                  },
                ];
            }
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
      console.log(e);
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
                    <Link href="/onboard" passHref>
                      <Button variant="neutral" mr="10px">
                        Re-submit
                      </Button>
                    </Link>
                    <Link href="/workspace" passHref>
                      <Button variant="primary" textDecoration={"none"}>
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
                        id={currentForm?.formTitle}
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
                            mt="25px"
                          >
                            {currentStep !== 0 && (
                              <Button
                                onClick={backHandler}
                                variant="neutral"
                                mr="10px"
                              >
                                Back
                              </Button>
                            )}
                            <Button
                              type="submit"
                              isLoading={isSubmitting}
                              disabled={isSubmitting}
                              color="diamond.white"
                              variant="primary"
                            >
                              {isLastStep ? "Submit Answers" : "Continue"}
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
    </>
  );
};

export default Onboard;
