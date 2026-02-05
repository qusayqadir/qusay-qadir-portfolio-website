import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ButtonIconHoverDemo = () => {
  // Opens a draft email to the chosen address
  const mailto = 'mailto:qadirq@mcmaster.ca?subject=[Your Name]: Reach Out! %20&body=Hi%20Qusay%2C%0A%0A'

  return (
    <Button className='group' asChild>
      <a href={mailto}>
        Email Me! 
        <ArrowRight className='ml-2 transition-transform duration-200 group-hover:translate-x-0.5' />
      </a>
    </Button>
  )
}

export default ButtonIconHoverDemo
