import { Button, TextInput } from 'flowbite-react';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Auth/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddService = () => {

    useEffect(
        () => {
            document.title = 'GoLocal | Add Service'
        }
    , [])

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddService = () => {
        const serviceImage = document.getElementById('photoSer').value;
        const serviceName = document.getElementById('nameSer').value;
        const serviceDescription = document.getElementById('descSer').value;
        const serviceProviderImage = user.photoURL;
        const serviceProviderEmail = user.email;
        const serviceProviderName = document.getElementById('yourName').value;
        const serviceArea = document.getElementById('areaSer').value;
        const servicePrice = document.getElementById('priceSer').value;

        const newService = { serviceImage, serviceArea, serviceDescription, serviceName, servicePrice, serviceProviderImage, serviceProviderName, serviceProviderEmail }

        fetch('https://tour-service-server.vercel.app/services', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newService)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Service added successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/services')
                }
            })
    }

    return (
        <div>
            <div className="relative">
                <img src="https://i.ibb.co/CvzZJBs/pexels-rushow-khan-122107.jpg" className="h-[480px] w-full object-cover" alt="" />
                <div className="h-[480px] bg-gradient-to-b from-[#0000008d] to-[#00000067] absolute top-0 w-full">
                    <h2 className="text-white text-7xl mt-60 md:ml-28 ml-6" data-aos="fade-right" data-aos-duration="1000">Add Your Service</h2>
                </div>
            </div>
            <section className="items-center lg:w-3/4 mx-auto px-2">
                <h2 className='text-center mt-10 text-3xl'>Please Provide the Required Information</h2>
                <p className='text-center mt-2 text-gray-500'>These information help us reach our customers with more credibility and authenticity</p>
                <div className="space-y-6 lg:w-1/2 md:w-3/4 mt-8 mx-auto">
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                    <div>
                        <TextInput
                            id="photoSer"
                            placeholder="Enter service photoURL..."
                            required
                        />
                    </div>
                    <div>
                        <TextInput
                            id="nameSer"
                            placeholder="Service title..."
                            required
                        />
                    </div>
                    <div>
                        <TextInput
                            id="yourEmail"
                            value={user.email}
                            readOnly
                        />
                    </div>
                    <div>
                        <TextInput
                            id="yourName"
                            value={user.displayName}
                            readOnly
                        />
                    </div>
                    <div>
                        <TextInput
                            id="priceSer"
                            type='number'
                            placeholder="Offer your pricing(per person)..."
                            required
                        />
                    </div>
                    <div>
                        <TextInput
                            id="areaSer"
                            placeholder="Service area..."
                            required
                        />
                    </div>
                    <div className='md:col-span-2'>
                        <TextInput id="descSer" placeholder="Short description of your service..." required />
                    </div>
                    </div>
                    <div className="w-full">
                        <Button onClick={handleAddService} color="success" className="w-full">Add Service</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddService;