// "use client";
// import { useEffect, useState } from "react";
// import { useActionState } from "react";
// import { z } from "zod";

// type formState = {
//     errors?: {
//         email?: string[];
//         body?: string[];
//     };
//     data: {
//         email: FormDataEntryValue | null;
//         body: FormDataEntryValue | null;
//     }
// }
// const FormSchema_ja = z.object({
//     email: z.string({
//         message: "emailアドレスは必須の項目です"
//     }).email({
//         message: "正しい形式のemailかご確認ください。"
//     }),
//     body: z.string({
//         message: "不正な文字が入力されています。"
//     }).min(1, { message: "本文をご記載ください" }).max(1000, { message: "本フォームは1000文字以内である必要があります。" })
// })

// const FormSchema_en = z.object({
//     email: z.string({
//         message: "email is required"
//     }).email({
//         message: "Please check that the email is in the correct format."
//     }),
//     body: z.string({
//         message: "Invalid characters have been entered."
//     }).min(1, { message: "Please enter the body." }).max(1000, { message: "The form must be within 1000 characters." })
// })

// async function formAction(prevState: formState, formData: FormData, lang: string = "ja"): Promise<formState> {
//     const vaildFormData = lang === "ja" ? FormSchema_ja.safeParse({
//         email: formData.get("email"),
//         body: formData.get("body")
//     }) : FormSchema_en.safeParse({
//         email: formData.get("email"),
//         body: formData.get("body")
//     });
//     if (!vaildFormData.success) {
//         return {
//             errors: vaildFormData.error.flatten().fieldErrors,
//             data: {
//                 email: formData.get("email"),
//                 body: formData.get("body"),
//             }
//         };
//     }
//     const userConfirmed = confirm(`以下の内容で送信しますか？\nemail: ${vaildFormData.data.email}\n本文 \n ${vaildFormData.data.body}`);
//     if (!userConfirmed) {
//         return {
//             data: {
//                 email: vaildFormData.data.email,
//                 body: vaildFormData.data.body
//             }
//         }
//     }
//     try {
//         const _formData = new URLSearchParams();
//         _formData.append('email', vaildFormData.data.email);
//         _formData.append('body', vaildFormData.data.body);
//         const response = await fetch('https://script.google.com/macros/s/AKfycbw_LDhcPClJ6LrptFAVyePn7MvX-vB6bzrVp8oHF7y4xIqCXvTbz2RDRl9xcC35o72OqA/exec', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: _formData.toString()
//         });
//         if (!response.ok) {
//             throw new Error("サーバーに問題が生じています。");
//         } else {
//             const { status, message }: { status: string, message: string } = await response.json();
//             if (status !== "success") {
//                 throw new Error(message);
//             }
//             alert("送信が完了しました。");
//             window.location.reload();
//             return {
//                 data: {
//                     email: "",
//                     body: ""
//                 }
//             }
//         }
//     } catch (e) {
//         console.log(e, "adafd");
//         alert("通信に問題が生じています。");
//         return {
//             data: {
//                 email: vaildFormData.data.email,
//                 body: vaildFormData.data.body
//             }
//         }
//     }
// }

// export const FormToGoogleForm = ({message}: {message: string}) => {
//     const url = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeUUIrFNhqfgXO59mmhgTTM4AsYB4w12hXQOi46EbhKCP9NmQ/formResponse"
//     const [formState, dispatch] = useActionState(formAction, { errors: {}, data: { email: null, body: null } })
//     return <>
//         <form action={dispatch}>
//             <p className="text-sm mb-3">{message}</p>
//             <div>
//                 <div className="mb-6">
//                     <label htmlFor="email" className="block mb-2 ml-2 text-sm font-medium text-gray-900 dark:text-white" >email*</label>
//                     <input id="email" name="email" type="email" aria-describedby="email-error" placeholder="abc@example.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                     <div id="email-error" className="mt-2">
//                         {
//                             formState.errors?.email && formState.errors.email.map((error: string) => (
//                                 <p className="text-xs text-red-700" key={error}>{error}</p>
//                             ))
//                         }
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <div>
//                     <label htmlFor="body" className="block mb-2 ml-2 text-sm font-medium text-gray-900 dark:text-white">本文*</label>
//                     <textarea
//                         id="body"
//                         name="body"
//                         aria-describedby="body-error"
//                         className="h-64 resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="連絡内容をお聞かせください。"
//                     />
//                     <div id="body-error" className="mt-2">
//                         {
//                             formState.errors?.body &&
//                             formState.errors.body.map((error: string) => (
//                                 <p className="text-xs text-red-700"  key={error}>{error}</p>
//                             ))
//                         }
//                     </div>
//                 </div>
//             </div>
//             <div className="flex justify-end mt-3 mr-1">
//             <button type="submit" className="rounded-lg pr-3 pl-3 py-2  text-white bg-cyan-700 hover:bg-cyan-800 dark:bg-cyan-950 dark:hover:bg-cyan-900 focus:outline-none">送信</button>
//             </div>
//         </form>
//     </>
// }

