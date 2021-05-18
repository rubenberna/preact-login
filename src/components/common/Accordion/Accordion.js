import { h } from 'preact'
import Collapsible from 'react-collapsible';
import { IconMinimize } from "../../../assets/icons/IconMinimize";
import { usePreviousValue } from '../../../utils/form.util';
import style from './accordion.css'

export const Accordion = (props) => {
  const { title, isOpen, body, toggleOpen, collapsible } = props
  const previousOpenState = usePreviousValue(isOpen)
  const openStatusChanged = previousOpenState !== isOpen
  const animatedClass = !openStatusChanged ? style.hide : (isOpen ? style.fadeIn : style.fadeOut)

  const Header = () => (
    <div class={style.accordionHeader} onClick={() => toggleOpen(!isOpen)}>
      <span class={style.accordionTitle}>
        {title}
      </span>
        <IconMinimize />
    </div>
  )

  const AccordionBody = ({body, className}) => (
    <div className={style.accordionBody + ' ' + className}>
      {body}
    </div>
  )
  return (
    <div class={style.accordionWrapper}>
      {
        collapsible ?
          <Collapsible class={style.accordion} trigger={<Header />} open={isOpen}>
            <AccordionBody body={body} />
          </Collapsible>
          :
          <div>
            <Header />
            <AccordionBody body={body} className={animatedClass} />
          </div>
      }
    </div>
  )
}
