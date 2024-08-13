import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { ReactNode } from "react";

import "./App.css";

const schema = z.object({
  name: z
    .string()
    .nonempty({ message: "Tên là bắt buộc" })
    .min(3, { message: " Tên phải có ít nhất 3 kí tự" }),

  parentName: z
    .string()
    .nonempty({ message: "Tên là bắt buộc" })
    .min(3, { message: " Tên phải có ít nhất 3 kí tự" }),
  gender: z.enum(["nam", "nu", "khac"]),
  email: z
    .string()
    .nonempty({ message: "Email là bắt buộc" })
    .email({ message: "Email không hợp lệ" }),
  pinCode: z
    .string()
    .nonempty({ message: "Mã Pin là bắt buộc" })
    .regex(/^\d{4}$/, { message: "Mã Pin phải là 4 chữ số" }),
  timeZone: z
    .string()
    .regex(
      /^(?:[A-Za-z_]+\/[A-Za-z_]+|UTC[+-]\d{2}:\d{2}|GMT[+-]\d{2}(:\d{2})?)$/,
    ),
  dateOfBirth: z
    .string()
    .refine((date) => new Date(date).toString() !== "Invalid Date"),

  country: z.enum(["Vietnam", "Thailand", "Laos", "Indonesia", "Singapore"]),
  phoneNumber: z
    .string()
    .nonempty({ message: "Phone number là bắt buộc" })
    .regex(/^\d{10,15}$/, {
      message: "Số điện thoại phải chứa từ 10 đến 15 chữ số",
    }),
});

type FormData = {
  name: string;
  parentName: string;
  gender: "nam" | "nu" | "khac";
  email: string;
  pinCode: string;
  timeZone: string;
  dateOfBirth: string;
  country: "Vietnam" | "Thailand" | "Laos" | "Indonesia" | "Singapore";
  phoneNumber: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("success");
  };

  return (
    <>
      <body>
        <div className="main">
          <div className="wrapper">
            <h1 className="text-4xl">Let's get you started</h1>
            <h4>Enter the details to get going</h4>
            <div className="register">
              <div className="first">
                <div className="number step">1</div>
                <div className="name">General Details</div>
              </div>
              <div className="second">
                <div className="number step">2</div>
                <div className="name">Event Details</div>
              </div>
              <div className="third">
                <div className="number step">3</div>
                <div className="name">Pricing and Submit</div>
              </div>
            </div>
            <form
              action=""
              className="form"
              id="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="display-flex">
                <div className="left">
                  <div className="group">
                    <label htmlFor="first-name">First Name*</label>
                    <div className="flex">
                      <input
                        type="text"
                        id="first-name"
                        placeholder="Enter your First Name"
                        // className="input"
                        className={`input h-[40px] ${errors.name ? "border-[2px] border-red-500" : ""}`}
                        {...register("name")}
                      />
                    </div>
                    <div>
                      {errors.name && (
                        <span className="error">{errors.name.message}</span>
                      )}
                    </div>
                  </div>
                  <div className="group mt-[10px]">
                    <label htmlFor="">Gender*</label>
                    <div className="flex">
                      <select
                        className={`input h-[40px] ${errors.gender ? "border-[2px] border-red-500" : ""}`}
                        {...register("gender")}
                      >
                        <option value="" disabled selected hidden>
                          Select
                        </option>
                        <option value="nam">nam</option>
                        <option value="nu">nu</option>
                        <option value="khac">khac</option>
                      </select>
                    </div>
                    <div>
                      {errors.gender && (
                        <span className="error">Hãy chọn gender</span>
                      )}
                    </div>
                  </div>
                  <div className="group mt-[10px]">
                    <label htmlFor="parent-first-name">
                      Mother/Father's First Name*
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="parent-first-name"
                        placeholder="Enter First Name"
                        className={`input h-[40px] ${errors.parentName ? "border-[2px] border-red-500" : ""}`}
                        {...register("parentName")}
                      />
                    </div>
                    <div>
                      {errors.parentName && (
                        <span className="error">
                          {errors.parentName.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="group mt-[10px]">
                    <label htmlFor="email">Email Address*</label>
                    <div className="flex">
                      <input
                        type="text"
                        id="email"
                        placeholder="Enter your Email Address"
                        className={`input h-[40px] ${errors.email ? "border-[2px] border-red-500" : ""}`}
                        {...register("email")}
                      />
                    </div>
                    <div>
                      {errors.email && (
                        <span className="error">{errors.email.message} </span>
                      )}
                    </div>
                  </div>
                  <div className="group mt-[10px]">
                    <label htmlFor="pin-code">Pin Code*</label>
                    <div className="flex">
                      <input
                        type="text"
                        id="pin-code"
                        placeholder="Enter your area's Pin Code"
                        className={`input h-[40px] ${errors.pinCode ? "border-[2px] border-red-500" : ""}`}
                        {...register("pinCode")}
                      />
                    </div>
                    <div>
                      {errors.pinCode && (
                        <span className="error">{errors.pinCode.message}</span>
                      )}
                    </div>
                  </div>
                  <div className="group mt-[10px]">
                    <label htmlFor="time-zone">Time Zone*</label>
                    <div className="flex">
                      <select
                        className={`input h-[40px] ${errors.timeZone ? "border-[2px] border-red-500" : ""}`}
                        {...register("timeZone")}
                      >
                        <option value="" disabled selected hidden>
                          Select
                        </option>
                        <option value="UTC-12:00">UTC-12:00</option>
                        <option value="UTC-11:00">UTC-11:00</option>
                        <option value="UTC-10:00">UTC-10:00</option>
                        <option value="UTC-09:00">UTC-09:00</option>
                        <option value="UTC-08:00">UTC-08:00</option>
                        <option value="UTC-07:00">UTC-07:00</option>
                        <option value="UTC-06:00">UTC-06:00</option>
                        <option value="UTC-05:00">UTC-05:00</option>
                        <option value="UTC-04:00">UTC-04:00</option>
                        <option value="UTC-03:00">UTC-03:00</option>
                        <option value="UTC-02:00">UTC-02:00</option>
                        <option value="UTC-01:00">UTC-01:00</option>
                        <option value="UTC+00:00">UTC+00:00</option>
                        <option value="UTC+01:00">UTC+01:00</option>
                        <option value="UTC+02:00">UTC+02:00</option>
                        <option value="UTC+03:00">UTC+03:00</option>
                        <option value="UTC+04:00">UTC+04:00</option>
                        <option value="UTC+05:00">UTC+05:00</option>
                        <option value="UTC+06:00">UTC+06:00</option>
                        <option value="UTC+07:00">UTC+07:00</option>
                        <option value="UTC+08:00">UTC+08:00</option>
                        <option value="UTC+09:00">UTC+09:00</option>
                        <option value="UTC+10:00">UTC+10:00</option>
                        <option value="UTC+11:00">UTC+11:00</option>
                        <option value="UTC+12:00">UTC+12:00</option>
                        <option value="UTC+13:00">UTC+13:00</option>
                        <option value="UTC+14:00">UTC+14:00</option>
                      </select>
                    </div>
                    <div>
                      {errors.timeZone && (
                        <span className="error">Hãy chọn múi giờ</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="group">
                    <label htmlFor="last-name">Last Name</label>
                    <div className="flex">
                      <input
                        type="text"
                        id="your-last-name"
                        placeholder="Enter your Last Name"
                        className="input h-[40px]"
                      />
                    </div>
                    <div>
                      <span className="error"></span>
                    </div>
                  </div>
                  <div className="group mt-[10px]">
                    <label htmlFor="date-of-birth">Date of Birth*</label>
                    <div className="flex">
                      <input
                        type="text"
                        id="date-of-birth"
                        placeholder="Enter your Date of Birth"
                        // onfocus="(this.type='date')"
                        onFocus={(e) => (e.target.type = "date")}
                        // onblur="(this.type='text')"
                        // onBlur={(e) => (e.target.type = "text")}
                        className={`input h-[40px] ${errors.dateOfBirth ? "border-[2px] border-red-500" : ""}`}
                        {...register("dateOfBirth")}
                      />
                    </div>
                    <div>
                      {errors.dateOfBirth && (
                        <span className="error">Hãy chọn ngày sinh</span>
                      )}
                    </div>
                  </div>
                  <div className="group mt-[10px]">
                    <label htmlFor="last-name-parent">Last Name</label>
                    <div className="flex">
                      <input
                        type="text"
                        id="parent-last-name"
                        placeholder="Enter Last Name"
                        className="input h-[40px]"
                      />
                    </div>
                    <div>
                      <span
                        id="parent-last-name-error"
                        className="error"
                      ></span>
                    </div>
                  </div>
                  <div className="bottom group">
                    <label htmlFor="country">Country*</label>
                    <div className="flex">
                      <select
                        className={`input h-[40px] ${errors.country ? "border-[2px] border-red-500" : ""}`}
                        {...register("country")}
                      >
                        <option value="" disabled selected hidden>
                          Select
                        </option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Laos">Laos</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>
                    <div>
                      {errors.country && (
                        <span className="error">Hãy chọn country</span>
                      )}
                    </div>
                  </div>
                  <div className="group mt-[5px]">
                    <label htmlFor="phone">
                      Phone Number(include country code)*
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="phone"
                        placeholder="Enter Phone"
                        className={`input h-[40px] ${errors.phoneNumber ? "border-[2px] border-red-500" : ""}`}
                        {...register("phoneNumber")}
                      />
                    </div>
                    <div>
                      {errors.phoneNumber && (
                        <span className="error">
                          {errors.phoneNumber.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                id="joinButton"
                className="ml-[585px] mt-[20px] h-[40px] bg-[#5826ae] text-white"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </body>
    </>
  );
}
