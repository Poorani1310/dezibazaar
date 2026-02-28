import { useContext } from "react";
import { DesiContext } from "../context/DesiContext";

const Contact = () => {

  const { user } = useContext(DesiContext); 
  
  const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted event ', e.target);
        alert(`Email sent to ${user.email} successfully! `);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: e.target.name.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
            email: user.email,
          }),
        });
        const data = await response.json();
        console.log(data);
    }

    return (
    <form className="flex justify-center items-center h-100" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 p-6">

        <label className="font-bold">Name</label>
        <input className="p-2 border rounded" type="text" placeholder="Your Name" name="name" />

        <label className="font-bold">Subject</label>
        <input className="p-2 border rounded" type="text" placeholder="Enter Subject" name="subject" />

        <label className="font-bold">Message</label>
        <textarea className="p-2 border rounded h-30" name="message"></textarea>

        <div className="col-span-2 text-center">
          <button className="px-4 py-2 w-20 bg-blue-500 text-white rounded-xl">
            Send
          </button>
        </div>
  </div>
</form>
  )
}

export default Contact
