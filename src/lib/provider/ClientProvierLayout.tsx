"use client";

import Navbar from "@/components/Header/Navbar";
import store from "../redux/store";
import { Provider } from "react-redux";
import Footer from "@/components/Footer/Footer";
import "@/app/globals.css";
import "@/app/app.css";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
const ClientProvierLayout = ({ children }: any) => {
  return (
    <div className="">
      <Provider store={store}>
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <HelmetProvider> {children}</HelmetProvider>
        <Footer />
      </Provider>
    </div>
  );
};

export default ClientProvierLayout;
