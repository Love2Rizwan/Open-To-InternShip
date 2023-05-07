
// import Head from 'next/head'
import { Helmet } from 'react-helmet';
import styles from '../styles/Home.module.css'
import LeftSection from '../components/leftSection';
import RightSection from '../components/rightSection';
import {useState, useEffect} from 'react';
// import { useRouter } from 'next/router'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { collegeDetailsApi } from '../utils/constants'



export default function Home() {
  const [collegeDetails, setCollegeDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // const router = useRouter()
  const location = typeof window != "undefined" ? window?.location : {}
  const { hostname } = location
  const [a, b, _] =  hostname?.split('.') || []
  // const collegeName = process.env.NODE_ENV === "production" ?  (a === 'www'? b : a) : 'iith'
 const collegeName = "iith"
console.log({location, hostname , collegeName, a, b, env:process.env.NODE_ENV})

  useEffect(() => {
      async function fetchCollegeDetails() {
        try {
          setIsLoading(true)
          const response = await fetch(collegeDetailsApi(collegeName))
          const val = await response.json()

          if (val.status === false)
            throw val.msg
          
          setCollegeDetails(val.data)
        } catch (error) {
            console.log({fetchCollegeDetailsError:error})
        } finally {
            setIsLoading(false)
        }
      }

      fetchCollegeDetails()
  }, [collegeName])


  async function refreshCollegeDetails() {
    try {
      // setIsLoading(true)
      const response = await fetch(collegeDetailsApi(collegeName))
      const val = await response.json()
console.log("val  ======>" , val)
      if (val.status === false)
        throw val.msg
      
      setCollegeDetails(val.data)
    } catch (error) {
        
    } finally {
        // setIsLoading(false)
    }
  }

  return (
    <div className={`${styles.full} ${styles.container}`}>
      <Helmet>
        <title>Function Up Intern</title>
        <meta name="description" content="Intern Form" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Helmet>

      <main className={`${styles.full} ${styles.main}`}>
        <LeftSection
          collegeDetails={collegeDetails}
        />

        <RightSection
          refreshCollegeDetails={refreshCollegeDetails}
          collegeDetails={collegeDetails}
        />
      </main>
    </div>
  )
}