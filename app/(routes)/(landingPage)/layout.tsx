import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/Navbar";

export default async function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full h-auto">{children}</div>;
    </>
  );
}
