interface HomeProps {
  poolCount: number,
  guessCount: number,
  usersCountResponse: number,

}	
import Image  from 'next/image'
import {useState} from 'react'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logo from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent } from 'react'
export default function Home(props: HomeProps) {
  const [poolTitle,setPoolTitle] = useState('')
  
  async function createPool(event: FormEvent) {
    event.preventDefault()
    try {
    const res = await api.post('/pools', {
      title: poolTitle
    });
    const { code }  = res.data

    await navigator.clipboard.writeText(code)
    alert('Bolão criado com sucesso! O Código do bolão foi copiado para a área de transferência.')
    setPoolTitle('')
    } catch (error) {
    alert('Erro ao criar o bolão, tente novamente!')
  }}

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logo} alt="NLW-Copa" />
        <h1 className="mt-14 text-5xl font-bold leading-tight text-white">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>
        <div className='mt-10 flex items-center gap-2 '>
          <Image src={usersAvatarExampleImg} alt="" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.usersCountResponse}</span> pessoas já estão usando
          </strong>
        </div>
        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input
          className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100' 
          type="text" 
          required 
          placeholder="Qual nome do seu bolão" 
          onChange={event => setPoolTitle(event.target.value)}
          value={poolTitle}
          />
          <button className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase" type="submit">Criar meu bolão</button>
        </form>
        <p className='mt-4 text-gray-300 leading-relaxed'>
        Após criar seu bolão, você receberá um código único que poderá usar pra convidar outras pessoas</p>
       
       
        <div className='mt-10 pt-10 border-t border-gray-600 items-center flex justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+ {props.poolCount}</span>
              <span>Bolões Criados</span>
            </div>
          </div>
          <div className='w-px h-14 bg-gray-600'></div>
          <div className='flex items-center gap-6'>
          <Image src={iconCheckImg} alt="" />
          <div className='flex flex-col'>
            <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites Enviados</span>
            </div>
          </div>
        </div>
      </main>

      
      <Image src={appPreviewImg} alt="Dois celulares exibindo uma previa da aplicacao movel do NLW" />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse,guessCountResponse,usersCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])
  return {
    props: {
      poolCount: poolCountResponse.data.pools,
      guessCount: guessCountResponse.data.guesses,
      usersCountResponse: usersCountResponse.data.users
    }
  }
}