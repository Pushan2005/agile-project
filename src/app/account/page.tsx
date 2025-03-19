import Logout from "@/components/logout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function AccountPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    return (
        <div className="h-full min-h-screen w-full bg-background relative">
            {/* Logout button - using form with server action */}
            <div className="absolute top-4 right-4 z-10">
                <form action="/api/auth/signout" method="post">
                    <Logout />
                </form>
            </div>

            <div className="container mx-auto h-full">
                <div className="flex flex-col md:flex-row h-full min-h-screen">
                    {/* Left side: Avatar, name and email */}
                    <div className="flex flex-col items-center justify-center p-8 md:w-1/3 bg-muted/10">
                        <Avatar className="h-32 w-32 text-4xl font-medium mb-6">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                "J"
                            </AvatarFallback>
                        </Avatar>

                        <h1 className="text-3xl font-bold mb-2">"John"</h1>
                        <p className="text-muted-foreground text-lg">
                            "johnmail"
                        </p>
                    </div>

                    {/* Mobile separator */}
                    <div className="md:hidden w-full">
                        <Separator className="my-0" />
                    </div>

                    {/* Desktop separator - vertical */}
                    <div className="hidden md:block">
                        <Separator orientation="vertical" className="h-full" />
                    </div>

                    {/* Right side: Description */}
                    <div className="md:w-2/3 p-8 flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold mb-4">About</h2>
                        <p className="text-lg leading-relaxed">"yes"</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
