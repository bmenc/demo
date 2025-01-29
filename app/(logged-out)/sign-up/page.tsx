"use client";
import Link from "next/link";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { LayoutDashboard, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const formSchema = zod
  .object({
    email: zod.string().email(),
    accountType: zod.enum(["personal", "company"]),
    companyName: zod.string().optional(),
    numberOfEmployees: zod.coerce.number().optional(),
    dateOfBirth: zod.date().refine((date) => {
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= eighteenYearsAgo;
    }, "You must be at least 18 years old"),
  })
  .superRefine((data, context) => {
    if (data.accountType === "company" && !data.companyName) {
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["companyName"],
        message: "Company name is required",
      });
    }

    if (
      data.accountType === "company" &&
      (!data.numberOfEmployees || data.numberOfEmployees < 1)
    ) {
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["numberOfEmployees"],
        message: "Number of employees is required",
      });
    }
  });

export default function SignupPage() {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      accountType: undefined,
      companyName: "",
      numberOfEmployees: 0,
    },
  });

  function handleSubmit(data: zod.infer<typeof formSchema>) {
    console.log(data);
  }

  const accountType = form.watch("accountType");

  const dateFromBirth = new Date();
  dateFromBirth.setFullYear(dateFromBirth.getFullYear() - 120);

  return (
    <>
      <Link href={"/"}>
        <LayoutDashboard size={40} strokeWidth={1} className="text-slate-700" />
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
                          autoComplete="on"
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
                            {...field}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue=""
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
                          <FormLabel>Company name</FormLabel>
                          <FormControl>
                            <Input
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
                          <FormLabel>Employees</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              placeholder="0"
                              {...field}
                              value={field.value || 0}
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
                          <FormLabel>Date of birth</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className="normal-case flex justify-between pr-3"
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  ></FormField>
                </>
              )}
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
