"use client";

import { logout } from "@/store/slices/authentication/authentication";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import Link from "next/link";
import { z } from "zod";
import PasswordChangeForm from "@/app/components/PasswordChangeForm";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  refCode: z.string(),
  buildingNo: z.string(),
  streetName: z.string(),
  area: z.string(),
  city: z.string(),
  state: z.string(),
  pinCode: z.string(),
  phone: z.string(),
});

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  if (token === null) {
    router.push("/signin");
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex gap-10 flex-col lg:flex-row lg:mx-0 mx-5">
      <div className="shadow-lg shadow-orange-400 p-10 rounded-md w-full relative">
        {user?.refCode && (
          <div className="flex items-center gap-2 absolute right-10 lg:mt-0 mt-10">
            <p className="text-sm font-bold text-gray-700">Referrel Id:</p>
            <p className="text-sm text-orange-500">{user?.refCode}</p>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h1 className="text-xl text-orange-500 font-bold">
              Edit Your Profile
            </h1>
            <div className="flex flex-col gap-5 sm:flex-row">
              <FormField
                control={form.control}
                name="name"
                defaultValue={user?.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-md"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                defaultValue={user?.email}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-md"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  
                )}
                
              />
                     <FormField
                control={form.control}
                name="phone"
                defaultValue={user?.phone}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-md"
                        placeholder="Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="buildingNo"
                defaultValue={user?.buildingNo}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building No.</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-md"
                        placeholder="Building No."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetName"
                defaultValue={user?.streetName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Name</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-md"
                        placeholder="Street Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="area"
                defaultValue={user?.area}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-md"
                        placeholder="Area"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                defaultValue={user?.city}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-md"
                        placeholder="City"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                defaultValue={user?.state}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-md"
                        placeholder="State"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pinCode"
                defaultValue={user?.state}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin-Code</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-md"
                        placeholder="Pin-Code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-5">
              <Link href="/">
                <Button variant={"outline"}>Cancel</Button>
              </Link>
              <Button className="bg-[#27187E]" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div>
        <PasswordChangeForm />
      </div>
    </div>
  );
};

export default ProfilePage;
