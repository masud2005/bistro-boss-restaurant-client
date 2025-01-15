import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItem = () => {
    const { name, category, recipe, price, image, _id } = useLoaderData();

    // Extra image changes
    const [imagePreview, setImagePreview] = useState(image)

    // console.log(image);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // const onSubmit = async (data) => {
    //     // console.log(data)
    //     // image upload to imgbb and then get an url
    //     const imageFile = { image: data.image[0] }
    //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     });

    //     if (res.data.success) {
    //         // now Update the menu item data to the server with the image url
    //         const menuItem = {
    //             name: data.name,
    //             category: data.category,
    //             price: parseFloat(data.price),
    //             recipe: data.recipe,
    //             image: res.data.data.display_url
    //         }
    //         const menuRes = await axiosSecure.patch(`our-menu/${_id}`, menuItem)
    //         if (menuRes.data.modifiedCount > 0) {
    //             // show success popup
    //             // reset();
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Successfully Updated",
    //                 text: `${data.name} is updated to the menu.`,
    //                 timer: 3000
    //             });
    //         }
    //     }
    // }




    const onSubmit = async (data) => {
        let imageUrl = image; // Start with the existing image URL

        const imageFile = data.image[0]; // Check if a new image is uploaded
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);

            // Upload new image to imgbb
            const res = await axiosPublic.post(image_hosting_api, formData);
            if (res.data.success) {
                imageUrl = res.data.data.display_url; // Update imageUrl with the new image URL
            }
        }

        // Prepare the updated menu item with either the existing or new image URL
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: imageUrl // Use the determined image URL
        };

        // Send the updated menu item to the server
        const menuRes = await axiosSecure.patch(`our-menu/${_id}`, menuItem);
        if (menuRes.data.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: "Successfully Updated",
                text: `${data.name} is updated to the menu.`,
                timer: 3000
            });
        }
    };


    // Extra image Changes
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <SectionTitle heading="Update an Item" subHeading="Refresh info"></SectionTitle>
            <div className='bg-white max-w-[992px] mx-auto p-10'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={name}
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={price}
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea defaultValue={recipe} {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>

                    {/* <div className="form-control w-full my-6">
                        <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
                    </div> */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Current Image</span>
                        </label>
                        <img src={imagePreview} alt="Current" className="w-32 h-32 object-cover" />
                        <input
                            type="file"
                            {...register('image')}
                            className="file-input w-full max-w-xs"
                            onChange={handleImageChange} />
                    </div>

                    <button className="btn">
                        Update menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;