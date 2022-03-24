/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Panel from '../Components/UI/Panel'
import useAxios from '../libs/useAxios'

const Index = () => {
    const [show, setShow] = useState(false)
    const [cast, setCast] = useState(false)

    let { id } = useParams()

    const FetchData = async () => {
        const { data } = await useAxios(`shows/${id}`)
        setShow(data)

        const { data:cast } = await useAxios(`shows/${id}/cast`)
        setCast(cast)
    }

    useEffect(() => {
        FetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        show && cast && <>
            <div className='mt-16'>
                <div className='flex justify-center items-center '>
                    <div className='bg-gradient-to-r overflow-auto from-indigo-500 to-indigo-800 w-full absolute top-0 skew-y-3'>
                        <div style={{backgroundImage: `url(${show?.image?.original})`}} className='h-[37rem] w-full flex justify-center items-center absolute opacity-25 blur-sm bg-cover bg-center'></div>
                    </div>

                    <div className='z-10 flex flex-col md:flex-row py-12 mx-32'>
                        <div className='p-12 md:w-1/3'>
                            <img alt="" data-aos="fade-up" src={show?.image?.original} className="rounded-xl shadow-xl h-[35rem]"/>
                        </div>
                        <div data-aos="fade-up" className='px-6 my-4 md:w-24'>
                            <div className='px-8 py-2 bg-gray-200/10 backdrop-blur-xl shadow-md rounded-md'>
                                <div className='my-4'>
                                    {
                                        show.rating.average ? (
                                            [...Array(5)].map((x, i) => <FontAwesomeIcon key={i} className={parseInt(show?.rating.average/2, 10) >= i+1 ? 'text-gray-300 text-md' : 'text-gray-700 text-md'} icon={faStar} /> )
                                        )
                                        :
                                        ([...Array(5)].map((x, i) => <FontAwesomeIcon key={i} className='text-gray-400 text-xs' icon={faStar} /> ))
                                    }
                                    <span className='text-sm mx-2'>({(show.rating.average/2).toFixed(1)})</span>
                                </div>
                                <h1 className='text-3xl font-medium	amy-4'>
                                    {show?.name}
                                </h1>
                                <p className='text-md font-base my-4 mb-16'>
                                    {show?.summary.replace(/<[^>]*>?/gm, '')}
                                </p>
                                <div className='absolute bottom-5'>
                                    {
                                        show.genres.length >= 1 &&
                                            show.genres.map(g => <span key={g} className="px-2 py-1 mx-0.5 text-xs rounded-full text-white  bg-indigo-800 ">{g}</span>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-24 container flex m-auto dark:text-white'>
                <Panel className='w-1/2 mx-4'>
                    <h1 className='font-medium text-xl mb-8'>Show Info</h1>
                    <InfoBlock>
                        <InfoRow title='Streamed on' text={show.network.name} />
                        <InfoRow title='Schedule' text={show.schedule.days.join(', ')} />
                        <InfoRow title='Status' text={show.status} />
                        { show.genres.length > 0 && <InfoRow title='Genres' text={show.genres.join(', ')} /> }
                        <InfoRow title='Language' text={show.language} />
                    </InfoBlock>
                </Panel>
                <Panel className='w-1/2 mx-4'>
                    <h1 className='font-medium text-xl mb-8'>Starring</h1>
                    <InfoBlock>
                        { cast.map((c, i) => <Star key={i} person={c.person} character={c.character} />) }
                    </InfoBlock>
                </Panel>
            </div>
        </>
    )
}

const Star = ({ person, character }) => {
    return (
        <tr className="border-b border-gray-800 dark:border-slate-200 w-full">
            <td className="px-2 py-4">
            {
                person.image && <img
                    src={person.image.medium}
                    className="rounded-full w-10 h-10 bg-contain bg-top"
                    alt="Avatar"
                />
            }
            </td>
            <td className="px-6 py-4 font-semibold">
                { person.name }
            </td>
            <td className="px-6 dark:text-slate-300">
                { character.name }
            </td>
        </tr>
    )
}

const InfoRow = ({ title, text }) => {
    return (
        <tr className="border-b border-gray-800 dark:border-slate-200 w-full">
            <td className="w-1/3 px-6 py-8 font-semibold">
                { title }
            </td>
            <td className="px-6 dark:text-slate-300">
                { text }
            </td>
        </tr>
    )
}

const InfoBlock = ({ children }) => {
    return (
        <table className='w-full'>
            <tbody className='text-left'>
                { children }
            </tbody>
        </table>
    )
}

export default Index