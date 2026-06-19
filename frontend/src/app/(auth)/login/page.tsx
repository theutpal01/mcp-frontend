import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plug } from "lucide-react";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center space-y-6">
        {/* Icon & Headers */}
        <div className="flex flex-col items-center space-y-2 w-full text-center">
          <div className="p-3 bg-brand-blue/10 rounded-full mb-2">
            <Plug className="w-6 h-6 text-brand-blue" />
          </div>
          <h2 className="text-3xl font-semibold text-brand-yellow tracking-wide">
            Welcome back
          </h2>
          <p className="text-brand-blue text-sm font-medium">
            To PlugFit
          </p>
        </div>

        {/* Form */}
        <form className="w-full space-y-5 mt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-yellow" htmlFor="email">
              Your email
            </label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-yellow" htmlFor="password">
              Your password
            </label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <div className="pt-2">
            <Button type="submit">
              Login
            </Button>
          </div>
        </form>

        {/* Footer Link */}
        <p className="text-sm text-brand-blue mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-brand-yellow hover:underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}