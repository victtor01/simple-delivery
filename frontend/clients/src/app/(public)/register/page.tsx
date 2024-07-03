"use client";

import {
  RegisterAuth,
  RegisterEnter,
  RegisterPersonInformation,
} from "@/components/register-user-components";
import { useStepStore } from "./store";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { api } from "@/app/api";

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  birth: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
  repeatPassword: z.string().min(1),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const useRegister = () => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [step, setStep] = useStepStore((state) => [
    state.step,
    state.increment,
  ]);

  const Components = [RegisterEnter, RegisterPersonInformation, RegisterAuth];

  const createUser = async (data: RegisterFormData) => {
    const { repeatPassword, ...props } = data;
    const response = await api.post('/clients/', {
      ...props
    });

    console.log(response);
  };

  return {
    Components,
    createUser,
    methods,
    states: {
      step,
      setStep,
    },
  };
};

export default function Register() {
  const {
    Components,
    createUser,
    methods,
    states: { step },
  } = useRegister();

  return (
    <div className="flex p-0 relative flex-col m-auto gap-3 w-full max-w-[28rem] ">
      <div
        className="bg-white overflow-hidden shadow-[0px_70px_40px_-60px_rgba(0,0,0,0.6)] 
        rounded-t-3xl mt-10 lg:mt-0 lg:rounded items-center relative flex flex-col gap-5 
        h-full lg:h-auto z-20"
      >
        <FormProvider {...methods}>
          <form
            className="flex w-full h-auto items-center min-h-[20rem]"
            onSubmit={methods.handleSubmit(createUser)}
          >
            <AnimatePresence>
              {Components?.map((Component, index: number) => {
                return (
                  step === index && (
                    <motion.div
                      key={`${index}`}
                      className="flex flex-col h-auto min-w-auto"
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{
                        delay: index === 0 ? 0.1 : 0.3,
                        duration: 0.3,
                      }}
                    >
                      <div className="flex flex-col items-center justify-center gap-6 w-full lg:w-[28rem] p-10">
                        <Component />
                      </div>
                    </motion.div>
                  )
                );
              })}
            </AnimatePresence>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

const variants: Variants = {
  initial: {
    display: "none",
    opacity: 0,
    rotateY: "140deg",
    x: 400,
    scale: 0.6,
  },
  animate: {
    opacity: 1,
    display: "flex",
    rotateY: "0",
    x: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    x: -400,
    scale: 0.4,
    rotateY: "-140deg",
    transition: {
      delay: 0,
      duration: 0.3,
    },
  },
};
