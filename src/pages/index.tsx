/*interface HomeProps {
  count: number
}	*/
import Image  from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
export default function Home() {

  return (
    <div>
      <main></main>
      <Image src={appPreviewImg} alt="Dois celulares exibindo uma previa da aplicacao movel do NLW" />
    </div>
  )
}

/*export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()
  return {
    props: {
      count: data.pools
    }
  }
}*/