import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        query: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch('http://localhost:5000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', query: '' });
            setTimeout(() => setSubmitted(false), 3000);
        }

    } catch (error) {
        console.error('❌ Frontend error:', error);
    }
};

    return (
        <div className="max-w-[1200px] mx-auto p-4 md:p-8 mt-12 mb-24 min-h-[60vh]">
            
            {/* Outer brutal container */}
            <div className="border-[8px] border-[var(--color-border)] bg-[var(--color-primary)] p-8 lg:p-16 brutal-shadow rotate-1 hover:rotate-0 transition-transform">
                
                {/* Title */}
                <h1 className="text-6xl md:text-8xl font-black uppercase mb-8 border-b-8 border-[var(--color-border)] pb-4 text-[var(--color-text-light)]">
                    Contact Us
                </h1>

                {/* Success Message */}
                {submitted && (
                    <p className="mb-6 text-xl font-bold bg-green-300 border-4 border-[var(--color-border)] p-4 rotate-[-1deg]">
                        Thank you! We'll get back to you soon.
                    </p>
                )}

                {/* Form Container */}
                <form 
                    onSubmit={handleSubmit}
                    className="bg-[var(--color-surface)] border-4 border-[var(--color-border)] p-6 md:p-10 -rotate-2 space-y-6"
                >

                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="text-xl font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border-4 border-[var(--color-border)] p-3 text-lg font-semibold focus:outline-none bg-white"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-xl font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border-4 border-[var(--color-border)] p-3 text-lg font-semibold focus:outline-none bg-white"
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                        <label className="text-xl font-bold mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border-4 border-[var(--color-border)] p-3 text-lg font-semibold focus:outline-none bg-white"
                        />
                    </div>

                    {/* Query */}
                    <div className="flex flex-col">
                        <label className="text-xl font-bold mb-2">Query</label>
                        <textarea
                            name="query"
                            value={formData.query}
                            onChange={handleChange}
                            rows="5"
                            required
                            className="border-4 border-[var(--color-border)] p-3 text-lg font-semibold focus:outline-none bg-white"
                        />
                    </div>

                    {/* Button */}
                    <button 
                        type="submit"
                        className="bg-[var(--color-primary)] text-[var(--color-text-light)] font-black text-xl px-6 py-3 border-4 border-[var(--color-border)] brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-all"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
}