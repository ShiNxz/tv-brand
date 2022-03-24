const Card = ({ children }) => {
    return (
        <div data-aos="fade-up" className='backdrop-blur-xl shadow-lg outline outline-offset-0 outline-1 outline-neutral-200/25 mb-36 w-2/6 h-2/5 rounded-xl bg-gray-200/10 flex justify-center text-center items-center flex-col p-10'>
            { children }
        </div>
    )
}

export default Card