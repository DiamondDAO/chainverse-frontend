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
import * as styles from "./styles";

const Onboard: NextPage = () => {
  const [{ data }] = useAccount({ fetchEns: true });
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [Welcome, Intro, Contact];
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
      <Box sx={styles.OnboardContainer}>
        <Container
          sx={styles.OnboardContainerInner}
          display={["none", null, "unset"]}
        >
          <CompletionBar
            stepArray={steps.map((i) => i.navTitle ?? i.formTitle)}
            currentStep={currentStep}
          />
        </Container>
        <Container sx={styles.OnboardContainerInner}>
          <Box sx={styles.FormContainer}>
            <Box sx={styles.FormBody}>
              {currentStep === steps.length ? (
                <>
                  <CompletedFormContent />
                  <Box sx={styles.ButtonContainer}>
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
                        <Box sx={styles.FormItems}>
                          <Box>{currentForm.component}</Box>
                          <Box sx={styles.ButtonContainer}>
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
