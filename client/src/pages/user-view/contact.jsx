import { CalendarDays, Link, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link as Linkto } from "react-router-dom";

const Contact = () => {
  return (
    <div className="sm:p-6 p-4">
      <div className="lg:p-10 sm:p-6 p-4 w-full flex flex-col items-center space-y-4 container mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold border-b-2 py-2 px-6 border-gray-400 w-fit text-center">
          Contuct Us
        </h1>
        <p className="font-semibold text-muted-foreground text-lg">
          We'd Love to Hear from You!
        </p>
        <p className="pt-10 text-justify">
          At Tiha Be Trendy, your satisfaction and convenience are our top
          priorities. Whether you have a question about your order, need help
          selecting the perfect baby beauty accessory, or just want to share
          feedback, we're here for you.
        </p>
        <div className="sm:pt-6 pt-4 w-full space-y-2">
          <h2 className="font-semibold text-xl">
            How to Reach Us
          </h2>
          <p>Customer Support:</p>
          <div className="flex items-center gap-2">
            <Mail size={20} />
            <p className="italic">tihabetrandy@gmail.com</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={20} />
            <p>+8801721578479</p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={20} />
            <p>Available Friday - Thursday</p>
          </div>
        </div>

        <div className="sm:pt-6 pt-4 w-full space-y-2">
          <div className="flex items-center gap-2 text-xl">
            <MapPin size={20} />
            <p className="font-semibold">Address</p>
          </div>
          <p>Tiha-be trendy</p>
          <p>Dhaka Cantonment</p>
          <iframe
            className="w-full h-[450px] pt-4"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.12321980078724!2d90.39404669780448!3d23.819611872677815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c72c9f33d029%3A0xa3f8db27eb6c1f0f!2sProshanti%20Homepathy%20Centre!5e0!3m2!1sen!2sbd!4v1729517664009!5m2!1sen!2sbd"
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>

        <div className="sm:pt-6 pt-4 w-full space-y-2">
          <div className="flex items-center gap-2">
            <Link size={20} />
            <p className="font-semibold text-xl">Stay Connected</p>
          </div>
          <p>
            Follow us on social media for the latest trends, promotions, and
            adorable baby styling tips:
          </p>
          <Linkto to="https://www.facebook.com/tihabetrendy" target="_blank"><div className="p-2 w-fit rounded-md hover:bg-blue-500 hover:text-white cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="h-6 w-6"
              fill="currentColor"
            >
              <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
            </svg>
          </div>
          </Linkto>
          <p>We look forward to helping you and making your shopping experience at Tiha Be Trendy as smooth and joyful as possible!</p>
        </div>

        <div className="flex gap-6 items-center justify-center">
          
        </div>
      </div>
      {/* <div className="p-1 w-fit rounded-md hover:bg-green-400 cursor-pointer hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="h-8 w-8"
          fill="currentColor"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </div> */}
    </div>
  );
};

export default Contact;