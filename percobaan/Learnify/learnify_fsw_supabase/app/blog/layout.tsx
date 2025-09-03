import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Learnify-Blog",
};

const BlogLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
    </div>
  );
};

export default BlogLayout;
