import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Brain, Gamepad2, Globe } from 'lucide-react';
import { Pricing } from '@/components/pricing/pricing';
import './pricing/pricing.css';

export default async function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <div className="py-12 md:py-24 lg:py-32">
        <Pricing country="US" />
      </div>
      <FAQSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Master Any Language with AI-Powered Learning
            </h1>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Revolutionize your language learning journey with LinguaLeap AI.
              Personalized lessons, interactive games, and AI-driven insights to
              accelerate your progress.
            </p>
          </div>
          <div className="space-x-4">
            <Button size={'lg'} variant="default">
              Get Started for Free
            </Button>
            <Button size={'lg'} variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Brain className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>AI-Powered Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Adaptive lessons tailored to your learning style and progress,
                powered by advanced AI algorithms.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Gamepad2 className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Interactive Games</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Engage with fun, interactive games designed to reinforce
                vocabulary and grammar in an enjoyable way.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Custom Word Sets</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Create and study personalized sets of words and phrases tailored
                to your specific learning goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section
      id="faq"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How does AI enhance language learning?
            </AccordionTrigger>
            <AccordionContent>
              Our AI technology adapts to your learning style, pace, and areas
              of difficulty. It creates personalized lesson plans, provides
              real-time feedback on pronunciation and grammar, and adjusts the
              difficulty of exercises to optimize your learning experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Can I learn multiple languages simultaneously?
            </AccordionTrigger>
            <AccordionContent>
              Yes! Depending on your subscription plan, you can learn multiple
              languages at the same time. Our Pro plan allows access to 3
              languages, while our Enterprise plan offers access to all
              available languages.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How do the interactive games work?
            </AccordionTrigger>
            <AccordionContent>
              Our interactive games are designed to reinforce vocabulary,
              grammar, and comprehension in a fun and engaging way. They include
              word matching, sentence building, listening exercises, and more.
              The games adapt to your skill level and focus on areas where you
              need more practice.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I create my own word sets to study?
            </AccordionTrigger>
            <AccordionContent>
              Our Pro and Enterprise plans allow you to create custom word sets.
              You can input words and phrases you want to focus on, and our
              system will incorporate them into your lessons and games. This
              feature is particularly useful for learners with specific goals,
              such as business vocabulary or preparing for a trip.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
