import { h } from 'preact';
import logo from '../../assets/img/Volvo_Ironmark_online_RGB.SVG'
import style from './header.css'

export const Header = () => {
  return (
    <div class={style.header}>
      <a href="#" aria-label="back" class={style.goBack}>
        <span class={style.goBackArrow}>&#8249;</span>
        <span>Back to Volvo Connect</span>
      </a>
      <div class={style.logoContainer}>
        <span class={style.logoName}>Volvo Financial Services</span>
        <img src={logo} class={style.logo} />
      </div>
    </div>
  )
}