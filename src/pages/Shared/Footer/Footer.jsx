import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className='container mx-auto'>
                <div className="flex flex-col md:flex-row justify-around items-start p-8">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
                        <p className="mb-2">123 ABS Street, Uni 21, Bangladesh</p>
                        <p className="mb-2">+88 123456789</p>
                        <p className="mb-2">Mon - Fri: 08:00 - 22:00</p>
                        <p>Sat - Sun: 10:00 - 23:00</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow US</h3>
                        <p className="mb-4">Join us on social media</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white text-2xl hover:text-yellow-500" aria-label="Facebook">
                                <FaFacebook size={32} />
                            </a>
                            <a href="#" className="text-white text-2xl hover:text-yellow-500" aria-label="Instagram">
                                <FaLinkedin size={32} />
                            </a>
                            <a href="#" className="text-white text-2xl hover:text-yellow-500" aria-label="Twitter">
                            <FaGithub size={32} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center bg-black py-4 ">
                <p>Copyright &copy; CulinaryCloud. Design by <span className='text-lg font-semibold'>Masud Rana</span>.</p>
            </div>
        </footer>
    );
};

export default Footer;
