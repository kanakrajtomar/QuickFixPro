"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import GoogleLogo from "@/assets/images/google-logo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { registerByEmail } from "@/lib/apis";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { login } from "@/store/slices/authentication/authentication";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the form validation schema using Zod
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  refCode: z.string().optional(),
  phone: z.string().optional(),
});

export default function SignupComponent() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      refCode: "",
      phone: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password, refCode = "", phone = "" } = values;
    
    try {
      // Try registering the user
      const response = await registerByEmail(name, email, password, refCode, phone);
      
      // If the registration was successful, proceed with login
      if (response) {  // Assuming 201 is returned for successful registration
        await dispatch(login(email, password));
        toast.success("Account created successfully!");
        router.push("/");
      } else {
        // If the response is anything but a success, show an error
        toast.error("User already exists. Please try a different email or phone number.");
      }
    } catch (error: any) {
      // Handle specific error cases, such as 409 Conflict for duplicate users
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message || "User already exists. Please try a different email or phone number.");
      } else {
        // Handle any other errors
        toast.error("Error creating account. Please try again.");
      }
    }
  }

  return (
    <div className="w-full lg:min-w-[600px] flex justify-center items-center p-4">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-customCardShadow-1 p-8">
        <h1 className="text-2xl font-bold mb-2">Create an account</h1>
        <p className="mb-8">Enter your details below</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="refCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Referral Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mb-4 bg-[#27187E] text-white">
              Create Account
            </Button>
            <div className="text-center mb-4">
              <span className="text-sm">Already have an account? </span>
              <Link className="text-sm text-[#758BFD]" href="/signin">
                Log in
              </Link>
            </div>
            <div className="flex flex-col space-y-4">
              <Button className="flex items-center justify-center space-x-2" variant="outline">
                <Image src={GoogleLogo} alt="Sign Up with Google" width={20} height={20} />
                <span>Sign Up with Google</span>
              </Button>
            </div>
          </form>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
}
