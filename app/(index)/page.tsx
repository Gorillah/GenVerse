import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <div className="bg-gray-500">
        <div className="container flex justify-between items-center  h-16">
          <h1>Logo</h1>
          <div>
            <Link href="/sign-in">
              <Button>Sign in</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
