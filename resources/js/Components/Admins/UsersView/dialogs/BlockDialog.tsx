import React, { useState } from "react";

import { Button } from "@/Components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { router } from "@inertiajs/react";
import Image from "@/Components/Custom/Image";

interface EditDialogProps {
    name?: string;
    id?: number;
    // handleShowSuccessMessage: () => void;
}

const formSchema = z.object({
    id: z.number(),
});

const BlockDialog: React.FC<EditDialogProps> = ({
    id,
    name,
    // handleShowSuccessMessage,
}) => {
    const [open, setOpen] = useState(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: 0,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        router.delete(`/criterion/${id}`);
        setOpen(false);

        // handleShowSuccessMessage();
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="justify-start w-full border-0 mt-1 "
                    size="sm"
                >
                    Block User
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <AlertDialogHeader className="py-8  flex flex-col items-center justify-center text-center">
                            <Image
                                src="/images/block_img.png"
                                alt="Block Image"
                                width={150}
                            />
                            <AlertDialogTitle className="text-purple-500">
                                Block User?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="w-4/5 text-center">
                                Clicking the proceed button will deny user
                                access into the entire system proceed?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-3 flex items-center justify-center">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                                variant="default"
                                type="submit"
                                className="w-full sm:w-20 bg-gradient-to-b from-pink-500 to-violet-700"
                            >
                                Proceed
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default BlockDialog;
