"use client";
import AppleLogo from "@/assets/images/apple-logo.svg";
import GoogleLogo from "@/assets/images/google-logo.svg";
import { login } from "@/store/slices/authentication/authentication";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/components/ui/use-toast";
import { clearError } from "@/store/slices/error/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export default function SigninComponent() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);

  const { toast } = useToast();

  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    if (error.message) {
      toast({
        title: error.title as string,
        // title:"already exists number or email",
        description: error.message as string,
        variant: "destructive",
      });

      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  if (token !== null) {
    router.push("/");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    dispatch(login(values.email, values.password));
  }

  return (
    <div className="w-full lg:min-w-[600px] flex justify-center items-center  p-4">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-customCardShadow-1 p-8">
        <h1 className="text-2xl font-bold mb-2">Login here</h1>
        <p className="mb-8">Enter your details below</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email or Phone Number" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex">
              <Button
                type="submit"
                className="w-full mb-4 bg-[#27187E] text-[#F1F2F6]"
              >
                Login
              </Button>
              <Button
                className="w-full mb-4 text-[#27187E] border-none shadow-none"
                variant="outline"
              >
                Forgot Password?
              </Button>
            </div>
            <div className="text-center mb-4">
              <span className="text-sm">or</span>
            </div>
            <div className="flex flex-col space-y-4">
              <Button
                className="flex items-center justify-center space-x-2"
                variant="outline"
              >
                <Image
                  src={GoogleLogo}
                  alt="Get it on Google Play"
                  width={20}
                  height={20}
                />
                <span>Sign in with Google</span>
              </Button>
              {/* <Button
                className="flex items-center justify-center space-x-2"
                variant="outline"
              >
                <Image
                  src={AppleLogo}
                  alt="Get it on Google Play"
                  width={20}
                  height={20}
                />
                <span>Sign in with Apple</span>
              </Button> */}
              <div className="text-center mb-4">
                <span className="text-sm">New here? </span>
                <Link className="text-sm text-[#758BFD]" href="/signup">
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
