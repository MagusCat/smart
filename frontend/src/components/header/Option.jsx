import { IconContext } from 'react-icons/lib';
import { FaAlignJustify } from 'react-icons/fa6';

function Option({name = 'dashboard'}) {
  return (
    <a href="#" className="flex min-w-24 h-10 shadow-[0px_2px_3px_#00000040] rounded-lg items-center text-center">
      <span className='mx-3'>
        <FaAlignJustify size={"1.4rem"}/>
      </span>      

      <span className='mr-3'>{name}</span> 
    </a>
  );
}

export default Option;
