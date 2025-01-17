import { useForm } from "react-hook-form"
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, formState: { errors }, reset} = useForm()
    const onSubmit = async (data) => {
        // console.log(data)

        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        // console.log(res.data);

        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/our-menu', menuItem)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.insertedId) {
                        reset();
                        Swal.fire({
                            icon: "success",
                            title: 'Successfully added',
                            text: `${data.name} is added to the menu.`,
                            timer: 3000
                        });
                    }
                })
                .catch(err => {
                    // console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: 'Failed',
                        text: `Failed is added to the menu.`,
                        timer: 3000
                    });
                })  
        }

    }


    return (
        <div>
            <SectionTitle heading="add an item" subHeading="What's new?" ></SectionTitle>
            <div className="bg-white max-w-[992px] mx-auto p-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            className="input input-bordered w-full" />
                        {errors.name?.type === "required" && (
                            <p className="text-red-600">Recipe name is required</p>
                        )}
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full mb-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="" {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                            {errors.category?.type === "required" && (
                                <p className="text-red-600">Category is required</p>
                            )}
                        </div>

                        {/* price */}
                        <div className="form-control w-full mb-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                            {errors.price?.type === "required" && (
                                <p className="text-red-600">Price is required</p>
                            )}
                        </div>

                    </div>
                    {/* recipe details */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea {...register('recipe', { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                        {errors.recipe?.type === "required" && (
                            <p className="text-red-600">Recipe is required</p>
                        )}
                    </div>

                    <div className="form-control w-full mb-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                        {errors.image?.type === 'required' && (
                            <p className="text-red-600">File is required</p>
                        )}
                    </div>

                    <button className="btn">
                        Add Item <FaUtensils className="ml-4"></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;