"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookie from "js-cookie";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  current_password: z.string().min(8),
  new_password: z.string().min(8),
  confirm_password: z.string().min(8),
});

const PasswordChangeForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const token = Cookie.get("token"); // Fetch token from cookie

      if (!token) {
        toast({
          title: "Authentication Error",
          description: "No authentication token found.",
          variant: "destructive",
        });
        return;
      }

      if (values.new_password !== values.confirm_password) {
        toast({
          title: "Password Mismatch",
          description: "New password and confirm password do not match.",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.post(
        "https://app-api.sampurnakart.in/changePassword",
        {
          oldPassword: values.current_password,
          newPassword: values.new_password,
        },
        {
          headers: {
            "x-auth-token": token, // Include token in headers
          },
        }
      );

      toast({
        title: "Password Changed Successfully",
        description: "Your password has been changed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="shadow-lg shadow-orange-400 p-10 rounded-md lg:w-[300px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-xl text-orange-500 font-bold">
            Change Your Password
          </h1>
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      className="shadow-md"
                      placeholder="Current Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      className="shadow-md"
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      className="shadow-md"
                      placeholder="Confirm New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-[#27187E]"
              type="submit"
            >
              Change Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordChangeForm;
