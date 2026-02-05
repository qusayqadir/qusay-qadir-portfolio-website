import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'

export const CardTopImageDemo = () => {
  return (
    <Card className='max-w-md pt-0'>
    <CardContent className='px-0'>
      <button
        type="button"
        className='block w-full text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-t-xl overflow-hidden cursor-pointer'
        aria-label='View banner'
      >
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/components/card/image-2.png?height=280&format=auto'
          alt='Banner'
          className='aspect-video h-70 w-full rounded-t-xl object-cover'
        />
      </button>
    </CardContent>
      <CardHeader>
        <CardTitle>Ethereal Swirl Gradient</CardTitle>
        <CardDescription>Smooth, flowing gradients blending rich reds and blues in an abstract swirl.</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3 max-sm:flex-col max-sm:items-stretch'>
        <Button>Explore More</Button>
        <Button variant={'outline'}>Download Now</Button>
      </CardFooter>
    </Card>
  )
}

