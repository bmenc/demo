"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { PanelsTopLeft, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = zod
  .object({
    email: zod.string().email("Invalid email address"),
    accountType: zod.enum(["personal", "company"]),
    companyName: zod.string().optional(),
    numberOfEmployees: zod.coerce.number().optional(),
    dateOfBirth: zod
      .date()
      .optional()
      .refine(
        (date) => {
          if (!date) return true;
          const today = new Date();
          const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );
          return date <= eighteenYearsAgo;
        },
        { message: "You must be at least 18 years old" }
      ),
    password: zod
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    passwordConfirm: zod.string(),
    acceptTerms: zod.boolean().refine((value) => value, {
      message: "You must accept the terms and conditions",
    }),
  })
  .superRefine((data, context) => {
    if (data.accountType === "company") {
      if (!data.companyName) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ["companyName"],
          message: "Company name is required",
        });
      }

      if (!data.numberOfEmployees || data.numberOfEmployees < 1) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ["numberOfEmployees"],
          message: "Number of employees is required",
        });
      }

      if (!data.dateOfBirth) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ["dateOfBirth"],
          message: "Date of birth is required",
        });
      }
    }

    if (data.password !== data.passwordConfirm) {
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Passwords must match",
      });
    }
  });

export default function SignupPage() {
  const router = useRouter();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      accountType: undefined,
      companyName: "",
      numberOfEmployees: undefined,
    },
  });

  function handleSubmit(data: zod.infer<typeof formSchema>) {
    console.log(data);
    router.push("/dashboard");
  }

  const accountType = form.watch("accountType");

  const dateFromBirth = new Date();
  dateFromBirth.setFullYear(dateFromBirth.getFullYear() - 120);

  return (
    <>
      <Link href={"/"}>
        <PanelsTopLeft size={40} strokeWidth={1} className="text-slate-700" />
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Sign up for a new Dashboard account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="john@doe.com"
                          type="email"
                          {...field}
                          value={field.value || ""}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => {
                  return (
                    <>
                      <FormItem>
                        <FormLabel htmlFor="accountType">
                          Account type
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value || ""}
                          >
                            <SelectTrigger id="accountType">
                              <SelectValue placeholder="Select an account type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="personal">
                                  Personal
                                </SelectItem>
                                <SelectItem value="company">Company</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  );
                }}
              ></FormField>
              {accountType === "company" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel htmlFor="companyName">
                            Company name
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="companyName"
                              placeholder="Acme Inc."
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="numberOfEmployees"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel htmlFor="numberOfEmployees">
                            Employees
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="numberOfEmployees"
                              type="number"
                              min={0}
                              placeholder="0"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col pt-2">
                          <FormLabel htmlFor="dateOfBirth">
                            Date of birth
                          </FormLabel>
                          <FormControl>
                            <div className="!z-[9999]">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className="normal-case flex justify-between pr-3 w-full"
                                    >
                                      {!!field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span> Pick a date</span>
                                      )}
                                      <CalendarIcon />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  align="start"
                                  className="w-auto p-0"
                                >
                                  <Calendar
                                    mode="single"
                                    defaultMonth={field.value}
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    fixedWeeks
                                    weekStartsOn={1}
                                    fromDate={new Date(dateFromBirth)}
                                    toDate={new Date()}
                                    captionLayout="dropdown-buttons"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  ></FormField>
                </>
              )}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        {/* <Input
                          id="password"
                          placeholder="••••••••"
                          type="password"
                          {...field}
                          value={field.value || ""}
                          autoComplete="off"
                        /> */}
                        <PasswordInput
                          id="password"
                          placeholder="••••••••"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="passwordConfirm">
                        Confirm password
                      </FormLabel>
                      <FormControl>
                        {/* <Input
                          id="passwordConfirm"
                          placeholder="••••••••"
                          type="password"
                          {...field}
                          value={field.value || ""}
                          autoComplete="off"
                        /> */}
                        <PasswordInput
                          id="passwordConfirm"
                          placeholder="••••••••"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex flex-row gap-2 items-center">
                        <FormControl>
                          <Checkbox
                            id="acceptTerms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>I accept the terms and conditions</FormLabel>
                      </div>
                      <FormDescription>
                        By signing up you agree to our {""}
                        <Link
                          href={"/"}
                          className="text-primary hover:underline"
                        >
                          terms of service
                        </Link>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <Button type="submit" variant="outline">
                Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Already have an account?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Log in</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
