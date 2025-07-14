// src/components/projects/wizard/BlueprintStep.tsx

import { List, Card, Typography } from 'antd'
import styles from './Wizard.module.css'

const { Title } = Typography

const BLUEPRINTS = [
  { id: 'empty', name: 'Empty Project', description: 'No pages, no models, no layouts, no blocks. Start from scratch.' },
  { id: 'blog', name: 'Blog Site', description: 'Your regular personal blog with posts, listing, and comments.' },
  { id: 'landing', name: 'Landing Page', description: 'Simple landing page. Marketing site with customizable layout, contact form.' },
  { id: 'portfolio', name: 'Personal Portfolio', description: 'Showcase your work. Homepage with about me layout, projects details, contact form.' },
  { id: 'agency', name: 'Agency Website', description: 'Multi-page site for an agency. Services, team, contact, testimonials.' }
]

interface BlueprintStepProps { onNext: () => void }

export function BlueprintStep({ onNext }: BlueprintStepProps) {
  const handleSelect = (id: string) => {
    // TODO: call API to create from blueprint
    console.log('Selected blueprint', id)
    onNext()
  }

  return (
    <>
      <Title level={5}>Pick a Blueprint</Title>
      <p className={styles.description}>
        Choose a project template to start with. You can customize it later.
        <br />
        <strong>Note:</strong> You can always add or remove pages, models, and layouts later. It is highly recommended to start with a blueprint to save time and start with a usable structure.
      </p>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={BLUEPRINTS}
        renderItem={bp => (
          <List.Item>
            <Card
              hoverable
              title={bp.name}
              onClick={() => handleSelect(bp.id)}
              className={styles.card}
            >
              {bp.description}
            </Card>
          </List.Item>
        )}
      />
    </>
  )
}
