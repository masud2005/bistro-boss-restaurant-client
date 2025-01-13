import { Link } from "react-router-dom";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";

const MenuCategory = ({ img, title, des, items }) => {
    return (
        <div>
            {
                title && <div className='my-10'>
                    <Cover img={img} title={title} des={des} />
                </div>
            }
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-2'>
                {
                    items.map(item => <MenuItem key={item._id} item={item} />)
                }

            </div>
            <div className='text-center mt-3'>
                <Link to={`/our-shop/${title}`}>
                    <button className='uppercase mt-5 py-2 px-5 border-b-[3px] border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300 font-semibold'>order your favourite food</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;