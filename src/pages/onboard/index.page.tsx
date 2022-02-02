import { Box, Container, Button, Spinner } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { borderStyles } from "@/common/theme";
import {
  Purpose,
  IntroContent,
  Interest,
} from "@/components/FormComponents/Forms";
import * as Yup from "yup";
import { CompletionBar } from "@/components/FormComponents/CompletionBar";
import { useAccount } from "wagmi";
import Router from "next/router";
import { CompletedFormContent } from "@/components/FormComponents/CompletedFormContent";
import Link from "next/link";
const Onboard: NextPage = () => {
  const [{ data, loading }] = useAccount({ fetchEns: true });
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  useEffect(() => {
    let checkIfAddressPresent = setTimeout(() => {
      if (!loading && !data) {
        setLoadingMessage("Please connect your wallet to continue");
        Router.push("/");
      }
    }, 1000);

    return () => {
      clearTimeout(checkIfAddressPresent);
    };
  }, [data, loading]);

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [IntroContent, Purpose, Interest];
  const currentForm = steps[currentStep];
  const currentValidationSchema = currentForm?.validation;
  const initialValues = steps.reduce((accValues, currStep) => {
    return {
      ...accValues,
      ...(currStep.initialValue && { ...currStep.initialValue }),
    };
  }, {});
  const isLastStep = currentStep === steps.length - 1;

  const submitForm = (values: any, actions: any) => {
    const stringifiedAnswers = JSON.stringify({
      ...values,
      activeSince: new Date().toISOString().slice(0, 10),
    });
    localStorage.setItem(
      "diamond-storage-" + data?.address!,
      stringifiedAnswers
    );
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
  console.log(data?.address, loading);
  return (
    <>
      {(loading || !data?.address) && <Box>{loadingMessage}</Box>}
      {!loading && data?.address && (
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          justifyContent="center"
        >
          <Container
            width="100%"
            position="absolute"
            maxW={"container.md"}
            mt="40px"
          >
            <CompletionBar
              stepArray={steps.map((i) => i.formTitle)}
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
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Box p="40px" width="100%" {...borderStyles}>
                {currentStep === steps.length ? (
                  <Box>
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
                  </Box>
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
                        <Form id={currentForm.formId}>
                          {currentForm.component}

                          <Box display="flex" justifyContent="flex-end">
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
