import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const items = [
  {
    title: 'Developer Tools',
    content: (
      <>
        <strong>Cloud Platforms:</strong> AWS (EC2, Kafka, Flink, Redis), GCP (Vertex Rag Engine, LookerStudio)
        <br />
        <strong>Databases:</strong> PostgreSQL, MySQL, MongoDB
        <br />
        <strong>Tools:</strong> Git/GitHub, Postman, Temporal, Docker, Grafana, Jira
      </>
    )
  },
  {
    title: 'Programming Languages',
    content: (
      <>
        <strong>Primary:</strong> Python, Java, SQL
        <br />
        <strong>Also:</strong> Go, C/C++, JavaScript, Typescript, HTML/CSS, Dart
      </>
    )
  },
  {
    title: 'Libraries & Frameworks',
    content: (
      <>
        <strong>Backend:</strong> FastAPI, Django, LangChain, SpringBoot, NodeJS, PyTest/JUnit
        <br />
        <strong>Data:</strong> Pandas, NumPy, TensorFlow, Apache Spark
      </>
    )
  }
]

const AccordionTabs = () => {
  return (
    <Accordion type='multiple' className='w-full'>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index + 1}`}
          className='data-[state=open]:bg-accent rounded-md border-none px-5 transition-colors duration-200'
        >
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent className='text-muted-foreground'>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionTabs
