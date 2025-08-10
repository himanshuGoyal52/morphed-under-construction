import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WhatsappShareButton } from 'react-share'

export default function Home() {
  const [ email , setEmail ] = useState('');
  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = {
      email : email
    }
    fetch(`${location.href}/api/notifiy`,{
      method : 'POST',
      headers : {
        "Content-Type" : 'application/json',
      },
      body : JSON.stringify(data), 
    }).then(res => res.text())
    .then(data => {
      toast.success("Hey! you will be get notified" , {position:toast.POSITION.BOTTOM_RIGHT , className:styles.notifiyPOP});
      setEmail('');
    }).catch((err) => {
      toast.error("Some error occurred :(");
    })
  }

  const [ USDtoINR , setUSDtoINR] = useState({});

  useEffect(() => {
    const getusdtoinr =  async () => {
			try{
				const _data = await axios.get('https://anyapi.io/api/v1/exchange/convert?base=USD&to=INR&amount=1&apiKey=2jkrf9duc2gab4gdrcbek8vbhmmuc7u9gt9erh17f09o87q758kla9o' ,{
				  headers : {
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				  }
				});
				setUSDtoINR(_data);
        console.log(_data);
        console.log(USDtoINR);
			}catch(err){
        // setUSDtoINR({rate : 82.45});
        console.log(USDtoINR);
			}
		}
		getusdtoinr();
  } , [USDtoINR])


  return (
    <>
      <Head>
        <title>Morphed Motors</title>
        <meta name="description" key="desc" content="Morph’d Motor designs and manufactures in-house electric go-karts and high-performance kart parts. Combining precision engineering, sleek design, and powerful electric drivetrains, they deliver thrilling, safe, and reliable rides." />
        <link rel="icon" href="/favico.png" />
        <meta name="robots" content="all" />
        <meta name="googlebot" />
        <meta property="og:title" content="Morphed Motors || Go Karts" />
        <meta
          property="og:description"
          content="Morph’d Motor designs and manufactures in-house electric go-karts and high-performance kart parts. Combining precision engineering, sleek design, and powerful electric drivetrains, they deliver thrilling, safe, and reliable rides."
        />
        <meta
          property="og:image"
          content="https://morphedmotors.com/public/favico.png"
        />
      </Head>
      <ToastContainer />
      <header>
        <nav className={styles.headerContainer}>

          <div>
            <Image src={'/morphed_logo.png'} width={128.5} height={20} alt="Morphed Motors.com"/>
          </div>

          <div>
            <a href="//api.whatsapp.com/send?phone=918619749140&text=You’ve entered the right pit stop" >
              <a className={styles.socialLink}> <Image width={25} height={25} src={'/whatsapp.png'} alt="Morphed Motors Facebook Page" /></a>
            </a>
            {/* <Link href={'https://www.facebook.com/MorphedMotors-107229878756138'}>
              <a target="_blank" className={styles.socialLink}> <Image width={20} height={20} src={'/facebook.png'} alt="Morphed Motors Facebook Page" /> </a>
            </Link> */}
            <Link href={'https://www.instagram.com/morphedmotors'}>
              <a target="_blank" className={styles.socialLink}> <Image width={20} height={20} src={'/instagram.png'} alt="Morphed Motors Instagram Page" /> </a>
            </Link>
            {/* <Link href={'https://www.linkedin.com/company/83014745/admin/'}>
              <a target="_blank" className={styles.socialLink}> <Image width={20} height={20} src={'/linkedin.png'} alt="Morphed Motors LinkedIn Page" /> </a>
            </Link> */}
            <Link href={'https://www.youtube.com/@MORPHED_MOTORS'}>
              <a target="_blank" className={styles.socialLink}> <Image width={20} height={20} src={'/youtube.png'} alt="Morphed Motors Youtube Page" /> </a>
            </Link>
          </div>

        </nav>
      </header>

      <main className={styles.mainContainer}>
          <Image src={'/caution-sign.png'} height={40} width={40} alt="Morphed Motors is under construction"/>
          <p className={styles.para}>
            Right now our website is under construction you can order on our <Link href={'https://www.instagram.com/morphedmotors'}><a className={styles.instaLink} target="_blank">instagram</a></Link> handle
          </p>
          <div className={styles.mainImg}>
            <Image src={'/main.png'} alt="Morphed Motors" height={362.5} width={531}/>
          </div>
      </main>

      <div className={styles.paddingDe}>
        <div className={styles.scrolling}>
          <span>Morphed Motor designs and manufactures in-house electric go-karts and high-performance kart parts. Combining precision engineering, sleek design, and powerful electric drivetrains, they deliver thrilling, safe, and reliable rides.</span>
        </div>
      </div>

      <footer className={styles.footerContainer}>
      
        <p className={styles.notiPara}>Get notified when we go live!</p>
        <div>
          <input onChange={handleChange} className={styles.inputEmail} placeholder='Enter your email' type='email' value={email}/> 
          <button onClick={handleSubmit} className={styles.inputButton} >Get Notified</button>
        </div>
        <span className={styles.footerCopy}>Copyright © {new Date().getFullYear()} Morphed Motors - All Rights Reserved</span>
      </footer>
    </>
  )
}
