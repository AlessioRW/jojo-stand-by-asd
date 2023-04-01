import { useState } from 'react'
import '../'
import { useNavigate } from 'react-router-dom/dist'

export function Main(){
    //「」
    const [url, setUrl] = useState('')
    const [inputError,setInputError] = useState(false)

    const navigate = useNavigate()

    function submit(){
        //https://charts.idrlabs.com/graphic/autism-spectrum?2&p=60,60,35,50,70,75,60,45,60,65&l=EN
        
        const pattern = new RegExp(
            '(idrlabs.com/graphic/autism-spectrum\\?2&p=)([1-9][0-9]?([0-9]*)?,*){10}(&l=[A-Z]+)'
        )

        if (pattern.test(url)){
            const score =( ((url.split('=')[1]).split('&')[0]).split(',')).join('-')
            navigate(`/results/${score}`, {state: {score: score}})
        } else {
            setInputError(true)
        }

        

    }

    return(
        <div className="main page">
            <h1 className='title'>Find your equivalent<span>「Jojo's Bizzare Adventure」</span>stand based on your autism spectrum results</h1>
            <p className='description'>Fill out this  <a href='https://www.idrlabs.com/autism-spectrum/test.php'>Autism Spectrum Test</a> by IDRlabs, once completed copy the URL to the graph image of your results, paste it in the box below and hit go!</p>
            <div className="input">
                <label htmlFor="url-input">URL to image: </label>
                <input 
                    name='url-input' 
                    className='url-input'
                    onChange={(e) => {
                        setUrl(e.target.value)
                        setInputError(false)
                    }}
                    >

                    </input>
                <button 
                    className="submit-image"
                    onClick={submit}
                    >
                        Go
                </button>
                
            </div>
            {inputError === true &&  
                <h3 className='input-error'>
                    Invalid Input
                </h3>
            }
            <p className='credits'>credits for the stand stats goes to jojowiki.com | credits for the idea go to kmrn._ on tiktok</p>
            {/* <a href='https://github.com/AlessioRW/jojo-stand-by-asd'>GitHub Repo</a> */}
        </div>
    )
}