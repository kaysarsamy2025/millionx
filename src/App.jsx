import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  GraduationCap,
  ClipboardCheck,
  FlaskConical,
  Mic,
  Briefcase,
  PenTool,
  Users,
  MapPinned,
  Sparkles,
  ArrowRight,
  Check,
  Languages,
  BookOpen,
  ShieldCheck,
  Wand2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };

const copy = {
  en: {
    brand: "LearnAI BD",
    tagline: "Bangladesh-first AI learning OS",
    nav: { features: "Features", demo: "Demo", teachers: "For Teachers", pricing: "Pricing", faq: "FAQ" },
    hero: {
      badge: "Adaptive • Bilingual • Exam-aware",
      title: "Personalized learning that predicts mistakes before they happen.",
      subtitle:
        "An AI tutor + exam coach + project lab — powered by a hyper-adaptive learning brain built for Bangladesh.",
      cta1: "Start Diagnostic",
      cta2: "See Live Demo",
      trust: "Grounded learning: curriculum mapping + verified steps + progress analytics",
    },
    sections: {
      featuresTitle: "What you can build (10-in-1, powered by one core engine)",
      featuresSubtitle: "Don’t build 10 products—build one learning brain that powers 10 experiences.",
      demoTitle: "Interactive demo (front-end prototype)",
      demoSubtitle: "This is a working UI skeleton you can connect to your backend later.",
      teachersTitle: "Teacher Tools (instant content generation)",
      pricingTitle: "Pricing (example)",
      faqTitle: "FAQ",
    },
    demoTabs: { student: "Student", exam: "Exam Coach", lab: "Project Lab", teacher: "Teacher Tools", rooms: "Collaboration" },
    studentDemo: {
      header: "Student Dashboard",
      desc: "Adaptive plan + bilingual tutor + mastery tracking. (All sample data, plug in your APIs later.)",
      placeholder: "Ask anything… e.g., Explain DTFT vs DFT in simple words",
      send: "Send",
      plan: "Today’s Plan",
      topics: "Topics",
      progress: "Progress",
      tutor: "AI Co-Teacher",
    },
    examDemo: {
      header: "Exam Coach",
      desc: "Generate exam-style questions, take a mock test, and get mistake analysis.",
      track: "Track",
      difficulty: "Difficulty",
      topics: "Topics",
      generate: "Generate Mock",
      submit: "Submit & Analyze",
      weak: "Weak areas detected",
    },
    labDemo: { header: "AI Project Lab", desc: "Build STEM/code projects with real-time debugging guidance. (UI-only prototype here.)", prompt: "What are you building?", code: "Code", run: "Run (simulate)", debug: "Debug with AI" },
    teacherDemo: { header: "AI Content Generator", desc: "Paste any chapter/topic, get worksheets, MCQs, class tests, and lesson plan drafts instantly.", input: "Chapter / Topic text", generate: "Generate", outputs: "Generated outputs" },
    roomsDemo: { header: "AI Collaboration Rooms", desc: "Study in groups with an AI moderator that keeps the discussion productive and exam-focused.", create: "Create Room", join: "Join", guide: "AI moderator guide" },
    pricing: { free: "Free", pro: "Pro", inst: "Institution", perMonth: "/month", cta: "Get Started" },
    faq: {
      q1: "How is this different from video platforms?",
      a1: "Videos are fixed. This adapts: it measures mastery, picks next questions, and explains in Bangla/English depending on the student.",
      q2: "Can it follow NCTB / BUET / Medical / BCS patterns?",
      a2: "Yes—by building curriculum + exam blueprints into a knowledge graph, then generating practice and mocks by topic + pattern.",
      q3: "What should we build first?",
      a3: "Start with one track (SSC / Admission / BCS), a high-quality tagged question bank, and diagnostic + analytics.",
    },
    footer: {
      note: "Prototype UI. Connect to your own auth, database, question bank, and LLM/RAG backend.",
      built: "Built as a Vite React app (Tailwind + lightweight shadcn-style components + framer-motion + recharts).",
    },
  },
  bn: {
    brand: "LearnAI BD",
    tagline: "বাংলাদেশ-ফার্স্ট AI লার্নিং OS",
    nav: { features: "ফিচার", demo: "ডেমো", teachers: "শিক্ষকদের জন্য", pricing: "প্রাইসিং", faq: "FAQ" },
    hero: {
      badge: "অ্যাডাপ্টিভ • দ্বিভাষিক • এক্সাম-অ্যাওয়ার",
      title: "শিখুন পার্সোনালাইজডভাবে—ভুল হওয়ার আগেই AI সতর্ক করবে।",
      subtitle: "AI টিউটর + এক্সাম কোচ + প্রজেক্ট ল্যাব — সব একসাথে, বাংলাদেশে মানানসইভাবে।",
      cta1: "ডায়াগনস্টিক শুরু করুন",
      cta2: "লাইভ ডেমো দেখুন",
      trust: "ভরসাযোগ্য শেখা: কারিকুলাম ম্যাপিং + ভেরিফাইড সল্যুশন + প্রোগ্রেস অ্যানালিটিক্স",
    },
    sections: {
      featuresTitle: "আপনি কী বানাতে পারেন (এক কোর ইঞ্জিনে ১০টা ফিচার)",
      featuresSubtitle: "১০টা আলাদা প্রোডাক্ট না—একটা লার্নিং ব্রেইন বানান, বাকিগুলো অটোমেটিক হবে।",
      demoTitle: "ইন্টারঅ্যাকটিভ ডেমো (ফ্রন্টএন্ড প্রোটোটাইপ)",
      demoSubtitle: "এটা কাজ করা UI স্কেলেটন—পরে আপনার ব্যাকএন্ড লাগালেই হবে।",
      teachersTitle: "শিক্ষকদের টুলস (ইন্সট্যান্ট কন্টেন্ট)",
      pricingTitle: "প্রাইসিং (উদাহরণ)",
      faqTitle: "FAQ",
    },
    demoTabs: { student: "স্টুডেন্ট", exam: "এক্সাম কোচ", lab: "প্রজেক্ট ল্যাব", teacher: "টিচার টুলস", rooms: "স্টাডি রুম" },
    studentDemo: {
      header: "স্টুডেন্ট ড্যাশবোর্ড",
      desc: "অ্যাডাপ্টিভ প্ল্যান + দ্বিভাষিক টিউটর + মাস্টারি ট্র্যাকিং। (স্যাম্পল ডেটা—পরে API লাগাবেন)",
      placeholder: "যেকোন প্রশ্ন করুন… যেমন, DTFT vs DFT সহজ ভাষায় বোঝাও",
      send: "পাঠান",
      plan: "আজকের প্ল্যান",
      topics: "টপিক",
      progress: "প্রোগ্রেস",
      tutor: "AI কো-টিচার",
    },
    examDemo: { header: "এক্সাম কোচ", desc: "এক্সাম প্যাটার্ন অনুযায়ী প্রশ্ন বানান, মক টেস্ট দিন, ভুল বিশ্লেষণ দেখুন।", track: "ট্র্যাক", difficulty: "ডিফিকাল্টি", topics: "টপিক", generate: "মক তৈরি করুন", submit: "সাবমিট + অ্যানালাইস", weak: "দুর্বল অংশ" },
    labDemo: { header: "AI প্রজেক্ট ল্যাব", desc: "STEM/কোড প্রজেক্ট বানান—রিয়েল-টাইম ডিবাগিং গাইডেন্স। (এখানে UI প্রোটোটাইপ)", prompt: "আপনি কী বানাচ্ছেন?", code: "কোড", run: "রান (সিমুলেট)", debug: "AI দিয়ে ডিবাগ" },
    teacherDemo: { header: "AI কন্টেন্ট জেনারেটর", desc: "যেকোন অধ্যায়/টপিক পেস্ট করুন—ওয়ার্কশিট, MCQ, ক্লাস টেস্ট, লেসন প্ল্যান বের হয়ে যাবে।", input: "অধ্যায় / টপিক টেক্সট", generate: "জেনারেট", outputs: "আউটপুট" },
    roomsDemo: { header: "AI স্টাডি রুম", desc: "গ্রুপে পড়ুন—AI মডারেটর আলোচনা গুছিয়ে রাখবে এবং এক্সাম ফোকাসড করবে।", create: "রুম খুলুন", join: "জয়েন", guide: "AI গাইড" },
    pricing: { free: "ফ্রি", pro: "প্রো", inst: "ইন্সটিটিউশন", perMonth: "/মাস", cta: "শুরু করুন" },
    faq: {
      q1: "ভিডিও প্ল্যাটফর্ম থেকে এটা আলাদা কীভাবে?",
      a1: "ভিডিও ফিক্সড। এখানে AI মাস্টারি মাপে, পরের প্রশ্ন ঠিক করে, আর ছাত্র যেমন বোঝে—Bangla/English এভাবে বুঝায়।",
      q2: "NCTB / BUET / Medical / BCS প্যাটার্ন ফলো করবে?",
      a2: "হ্যাঁ—কারিকুলাম + এক্সাম ব্লুপ্রিন্টকে নলেজ গ্রাফে রেখে টপিক+প্যাটার্ন অনুযায়ী প্র্যাকটিস/মক বানানো যায়।",
      q3: "প্রথমে কী বানানো উচিত?",
      a3: "একটা ট্র্যাক দিয়ে শুরু করুন (SSC/Admission/BCS), ভালো ট্যাগ করা প্রশ্ন ব্যাংক, আর ডায়াগনস্টিক+অ্যানালিটিক্স।",
    },
    footer: { note: "এটা UI প্রোটোটাইপ। আপনার auth, database, question bank, এবং LLM/RAG backend যুক্ত করুন।", built: "Vite React অ্যাপ (Tailwind + lightweight components + framer-motion + recharts)।" },
  },
};

function useLang() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => copy[lang], [lang]);
  return { lang, setLang, t };
}

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
function Pill({ children }) { return <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">{children}</span>; }
function Anchor({ id }) { return <div id={id} className="scroll-mt-24" />; }

function FeatureCard({ icon: Icon, title, desc, badge }) {
  return (
    <motion.div variants={fadeUp}>
      <Card className="h-full rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border p-2"><Icon className="h-5 w-5" /></div>
              <div>
                <CardTitle className="text-base">{title}</CardTitle>
                {badge ? <div className="mt-1"><Badge variant="secondary" className="rounded-full">{badge}</Badge></div> : null}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">{desc}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ChatBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={"max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm " + (isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
        {text}
      </div>
    </div>
  );
}

function StudentDemo({ t, lang }) {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState(() => [
    { role: "assistant", text: lang === "bn" ? "হাই! আমি আপনার AI কো-টিচার। আজ কী পড়বেন? (Bangla/English যে কোনোটা)" : "Hi! I’m your AI Co-Teacher. What are we studying today? (Bangla/English both)" },
    { role: "assistant", text: lang === "bn" ? "টিপ: ‘এক্সাম স্টাইল’ বললে আমি ৫–৭ বা ৭–১০ মার্কসের মতো করে উত্তর সাজাব।" : "Tip: Say ‘exam style’ and I’ll format answers like 5–7 or 7–10 marks." }
  ]);

  const topics = useMemo(() => [
    { name: "2D Transformations", mastery: 78 },
    { name: "DTFT / DFT", mastery: 62 },
    { name: "Line Clipping", mastery: 54 },
    { name: "Signals & Systems", mastery: 71 },
    { name: "Arduino Basics", mastery: 85 },
  ], []);

  const plan = useMemo(() => [
    { task: "10-min Diagnostic", done: true },
    { task: "Weak topic: Line Clipping", done: false },
    { task: "20 MCQ + 5 short", done: false },
    { task: "1 mini project: Arduino buzzer", done: false },
  ], []);

  const progressSeries = useMemo(() => [
    { day: "Mon", score: 48 }, { day: "Tue", score: 55 }, { day: "Wed", score: 61 }, { day: "Thu", score: 63 }, { day: "Fri", score: 70 }, { day: "Sat", score: 74 }, { day: "Sun", score: 79 },
  ], []);

  function send() {
    const trimmed = msg.trim();
    if (!trimmed) return;
    const reply = lang === "bn" ? `ঠিক আছে। “${trimmed}” — আগে কনসেপ্ট, তারপর এক্সাম-স্টাইল ছোট পয়েন্টে দেব।` : `Got it. “${trimmed}” — I’ll explain the concept first, then give exam-style points.`;
    setChat((c) => [...c, { role: "user", text: trimmed }, { role: "assistant", text: reply }]);
    setMsg("");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <Card className="lg:col-span-3 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">{t.studentDemo.topics}</CardTitle>
          <CardDescription>{lang === "bn" ? "মাস্টারি (স্যাম্পল)" : "Mastery (sample)"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {topics.map((x) => (
            <div key={x.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{x.name}</div>
                <div className="text-xs text-muted-foreground">{x.mastery}%</div>
              </div>
              <Progress value={x.mastery} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="lg:col-span-6 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">{t.studentDemo.tutor}</CardTitle>
              <CardDescription>{t.studentDemo.desc}</CardDescription>
            </div>
            <Badge className="rounded-full" variant="secondary">BN/EN</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-[320px] overflow-auto rounded-2xl border bg-background p-3 space-y-3">
            {chat.map((m, idx) => <ChatBubble key={idx} role={m.role} text={m.text} />)}
          </div>
          <div className="flex gap-2">
            <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t.studentDemo.placeholder} onKeyDown={(e) => { if (e.key === "Enter") send(); }} />
            <Button onClick={send} className="rounded-2xl">{t.studentDemo.send} <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill><ShieldCheck className="mr-2 h-3.5 w-3.5" />{lang === "bn" ? "সোর্স-ভিত্তিক ব্যাখ্যা" : "Source-grounded explanations"}</Pill>
            <Pill><BookOpen className="mr-2 h-3.5 w-3.5" />{lang === "bn" ? "এক্সাম-স্টাইল উত্তর" : "Exam-style answers"}</Pill>
            <Pill><Brain className="mr-2 h-3.5 w-3.5" />{lang === "bn" ? "ভুল প্রেডিকশন (ডেমো)" : "Mistake prediction (demo)"}</Pill>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">{t.studentDemo.progress}</CardTitle>
          <CardDescription>{lang === "bn" ? "সাপ্তাহিক স্কোর (স্যাম্পল)" : "Weekly score (sample)"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <Separator />

          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold">{t.studentDemo.plan}</div>
              <Badge variant="outline" className="rounded-full">{lang === "bn" ? "ডেইলি" : "Daily"}</Badge>
            </div>
            <div className="space-y-2">
              {plan.map((p) => (
                <div key={p.task} className="flex items-start gap-2 rounded-xl border p-3">
                  <div className={"mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border " + (p.done ? "bg-primary text-primary-foreground" : "bg-background")}>
                    {p.done ? <Check className="h-3.5 w-3.5" /> : null}
                  </div>
                  <div className="text-sm">{p.task}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExamCoachDemo({ t, lang }) {
  const [track, setTrack] = useState("SSC");
  const [difficulty, setDifficulty] = useState("Medium");
  const [topic, setTopic] = useState("Math");
  const [generated, setGenerated] = useState(false);
  const [answers, setAnswers] = useState({});
  const [analysis, setAnalysis] = useState(null);

  const mock = useMemo(() => [
    { id: "q1", q: lang === "bn" ? "DTFT আর DFT এর মধ্যে ৩টা পার্থক্য লিখুন।" : "Write 3 differences between DTFT and DFT.", expect: "concept" },
    { id: "q2", q: lang === "bn" ? "Cohen–Sutherland line clipping এর ধাপগুলো লিখুন।" : "List the steps of Cohen–Sutherland line clipping.", expect: "steps" },
    { id: "q3", q: lang === "bn" ? "Arduino pull-up resistor কেন ব্যবহার করি? সংক্ষেপে ব্যাখ্যা করুন।" : "Why do we use Arduino pull-up resistor? Explain briefly.", expect: "reason" },
  ], [lang]);

  function generate() { setGenerated(true); setAnalysis(null); setAnswers({}); }
  function submit() {
    const weak = mock.filter((q) => (answers[q.id] || "").trim().length < 25).map((q) => q.expect);
    const score = clamp(100 - weak.length * 22, 0, 100);
    setAnalysis({ score, weak, message: lang === "bn" ? "দুর্বল জায়গাগুলোতে ২০টা প্র্যাকটিস + ১টা মিনি রিভিশন লেসন সাজেস্ট করছি।" : "I suggest 20 targeted practices + 1 mini revision lesson for weak areas." });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <Card className="lg:col-span-4 rounded-2xl">
        <CardHeader><CardTitle className="text-base">{t.examDemo.header}</CardTitle><CardDescription>{t.examDemo.desc}</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">{t.examDemo.track}</div>
            <Select value={track} onValueChange={setTrack}>
              <SelectTrigger className="rounded-2xl"><SelectValue placeholder={t.examDemo.track} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SSC">SSC (9–10)</SelectItem>
                <SelectItem value="HSC">HSC</SelectItem>
                <SelectItem value="Admission">Admission</SelectItem>
                <SelectItem value="BCS">BCS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">{t.examDemo.difficulty}</div>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="rounded-2xl"><SelectValue placeholder={t.examDemo.difficulty} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">{t.examDemo.topics}</div>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="rounded-2xl"><SelectValue placeholder={t.examDemo.topics} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Math">Math</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="English">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">{track}</Badge>
            <Badge variant="secondary" className="rounded-full">{difficulty}</Badge>
            <Badge variant="secondary" className="rounded-full">{topic}</Badge>
          </div>

          <Button onClick={generate} className="w-full rounded-2xl">{t.examDemo.generate} <Wand2 className="ml-2 h-4 w-4" /></Button>
          <div className="text-xs text-muted-foreground">{lang === "bn" ? "নোট: বাস্তবে এখানে আপনার প্রশ্ন ব্যাংক + ব্লুপ্রিন্ট থেকে প্রশ্ন আসবে।" : "Note: In production, questions come from your tagged bank + blueprint."}</div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-8 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">{generated ? (lang === "bn" ? "মক টেস্ট" : "Mock Test") : (lang === "bn" ? "মক তৈরি করুন" : "Generate a mock")}</CardTitle>
          <CardDescription>{generated ? (lang === "bn" ? "উত্তর লিখে সাবমিট করুন" : "Write your answers then submit") : (lang === "bn" ? "বাম পাশ থেকে সেটিংস দিয়ে মক তৈরি করুন" : "Use the left panel to generate a mock")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!generated ? (
            <div className="rounded-2xl border p-6 text-sm text-muted-foreground">{lang === "bn" ? "এখানে প্রশ্ন দেখাবে…" : "Questions will appear here…"}</div>
          ) : (
            <div className="space-y-4">
              {mock.map((q, idx) => (
                <div key={q.id} className="rounded-2xl border p-4">
                  <div className="mb-2 text-sm font-semibold">{idx + 1}. {q.q}</div>
                  <Textarea value={answers[q.id] || ""} onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))} className="min-h-[90px] rounded-2xl" placeholder={lang === "bn" ? "আপনার উত্তর…" : "Your answer…"} />
                </div>
              ))}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button onClick={submit} className="rounded-2xl">{t.examDemo.submit}</Button>
                {analysis ? (
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full">{analysis.score}%</Badge>
                    <span className="text-sm text-muted-foreground">{analysis.message}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">{lang === "bn" ? "সাবমিট করলে বিশ্লেষণ দেখাবে" : "Submit to see analysis"}</span>
                )}
              </div>

              {analysis ? (
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-base">{t.examDemo.weak}</CardTitle>
                    <CardDescription>{lang === "bn" ? "ছোট উত্তর/অসম্পূর্ণ উত্তর থেকে (ডেমো)" : "From short/incomplete answers (demo)"}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {analysis.weak.length ? analysis.weak.map((w, i) => <Badge key={i} variant="secondary" className="rounded-full">{w}</Badge>) : <Badge className="rounded-full">{lang === "bn" ? "ভালো!" : "Great!"}</Badge>}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectLabDemo({ t, lang }) {
  const [idea, setIdea] = useState(lang === "bn" ? "একটা push-button দিয়ে LED + buzzer চালু/বন্ধ করবো" : "I want a push-button to control LED + buzzer");
  const [code, setCode] = useState(`// Arduino demo code (UI-only)
const int BTN = 2;
const int LED = 13;
const int BUZ = 8;

void setup(){
  pinMode(BTN, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  pinMode(BUZ, OUTPUT);
}

void loop(){
  int s = digitalRead(BTN);
  if(s == LOW){
    digitalWrite(LED, HIGH);
    digitalWrite(BUZ, HIGH);
  } else {
    digitalWrite(LED, LOW);
    digitalWrite(BUZ, LOW);
  }
}`);
  const [log, setLog] = useState(lang === "bn" ? "রান করলে এখানে আউটপুট/সিমুলেশন লগ দেখাবে…" : "Run to see output/simulation logs here…");

  function run() { setLog(lang === "bn" ? "✅ সিমুলেশন: Button চাপলে LED=ON, Buzzer=ON | ছাড়লে OFF (INPUT_PULLUP)" : "✅ Simulation: Press => LED=ON, Buzzer=ON | Release => OFF (INPUT_PULLUP)"); }
  function debug() { setLog(lang === "bn" ? "🛠 ডিবাগ টিপস: (1) GND কমন আছে? (2) Button wiring ঠিক? (3) BUZ pin 8-এ? (4) Serial print দিয়ে BTN read চেক করুন।" : "🛠 Debug tips: (1) Common GND? (2) Button wiring correct? (3) Buzzer on pin 8? (4) Use Serial prints to verify BTN read."); }

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <Card className="lg:col-span-4 rounded-2xl">
        <CardHeader><CardTitle className="text-base">{t.labDemo.header}</CardTitle><CardDescription>{t.labDemo.desc}</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm font-medium">{t.labDemo.prompt}</div>
          <Textarea value={idea} onChange={(e) => setIdea(e.target.value)} className="min-h-[120px] rounded-2xl" />
          <div className="flex gap-2">
            <Button onClick={run} className="rounded-2xl">{t.labDemo.run}</Button>
            <Button onClick={debug} variant="secondary" className="rounded-2xl">{t.labDemo.debug}</Button>
          </div>
          <div className="rounded-2xl border bg-muted/40 p-4 text-sm">{log}</div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-8 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">{t.labDemo.code}</CardTitle>
          <CardDescription>{lang === "bn" ? "এখানে অনলাইন কম্পাইলার/সিমুলেটর যুক্ত করতে পারেন (later)" : "You can plug in an online compiler/simulator later"}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea value={code} onChange={(e) => setCode(e.target.value)} className="min-h-[360px] rounded-2xl font-mono" />
        </CardContent>
      </Card>
    </div>
  );
}

function TeacherToolsDemo({ t, lang }) {
  const [text, setText] = useState(lang === "bn" ? "অধ্যায়: কমিউনিকেশন প্রোটোকল। টপিক: UART, SPI, I2C।" : "Chapter: Communication Protocols. Topics: UART, SPI, I2C.");
  const [out, setOut] = useState(null);

  function generate() {
    const mcq = [
      { q: lang === "bn" ? "UART-এ সাধারণত কয়টা ডাটা লাইন লাগে?" : "How many data lines are typically used in UART?", a: lang === "bn" ? "২টা (TX, RX)" : "Two (TX and RX)" },
      { q: lang === "bn" ? "I2C-র প্রধান দুইটা লাইন কী?" : "What are the two main lines in I2C?", a: lang === "bn" ? "SDA, SCL" : "SDA and SCL" },
    ];
    const worksheet = lang === "bn"
      ? ["সংজ্ঞা লিখুন: UART, SPI, I2C", "SPI-তে Master/Slave ধারণা ব্যাখ্যা করুন", "I2C Addressing কীভাবে কাজ করে?"]
      : ["Write definitions: UART, SPI, I2C", "Explain master/slave concept in SPI", "How does I2C addressing work?"];
    const lessonPlan = lang === "bn"
      ? ["উদ্দেশ্য: প্রোটোকলগুলোর পার্থক্য বোঝানো", "ডেমো: Arduino দিয়ে I2C sensor read", "কুইজ: ৫টা MCQ + ২টা short"]
      : ["Objective: understand differences between protocols", "Demo: Arduino I2C sensor read", "Quiz: 5 MCQ + 2 short"];
    setOut({ mcq, worksheet, lessonPlan });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <Card className="lg:col-span-5 rounded-2xl">
        <CardHeader><CardTitle className="text-base">{t.teacherDemo.header}</CardTitle><CardDescription>{t.teacherDemo.desc}</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm font-medium">{t.teacherDemo.input}</div>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[180px] rounded-2xl" />
          <Button onClick={generate} className="w-full rounded-2xl">{t.teacherDemo.generate} <Sparkles className="ml-2 h-4 w-4" /></Button>
          <div className="text-xs text-muted-foreground">{lang === "bn" ? "বাস্তবে: আপনি NCTB chapter/PDF থেকে RAG দিয়ে সোর্স-ভিত্তিক আউটপুট দেবেন।" : "In production: use RAG over NCTB chapters/PDF to generate grounded outputs."}</div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-7 rounded-2xl">
        <CardHeader><CardTitle className="text-base">{t.teacherDemo.outputs}</CardTitle><CardDescription>{lang === "bn" ? "স্যাম্পল জেনারেশন" : "Sample generation"}</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {!out ? (
            <div className="rounded-2xl border p-6 text-sm text-muted-foreground">{lang === "bn" ? "জেনারেট চাপুন—এখানে আউটপুট দেখাবে" : "Click Generate — outputs will appear here"}</div>
          ) : (
            <div className="space-y-4">
              <Card className="rounded-2xl">
                <CardHeader><CardTitle className="text-sm">MCQ Bank</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {out.mcq.map((m, i) => (
                    <div key={i} className="rounded-xl border p-3">
                      <div className="text-sm font-semibold">Q: {m.q}</div>
                      <div className="mt-1 text-sm text-muted-foreground">A: {m.a}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader><CardTitle className="text-sm">Worksheet</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {out.worksheet.map((x, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                      <div className="text-sm">{x}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader><CardTitle className="text-sm">Lesson Plan</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {out.lessonPlan.map((x, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                      <div className="text-sm">{x}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function RoomsDemo({ t, lang }) {
  const [code, setCode] = useState("BD-42");
  const [log, setLog] = useState(lang === "bn" ? "AI মডারেটর: আজ আমরা ৩০ মিনিটে টপিক শেষ করব। প্রথমে কনসেপ্ট → তারপর ৫টা প্রশ্ন।" : "AI moderator: We’ll finish in 30 minutes. Concept → then 5 questions.");

  function create() {
    const id = "BD-" + Math.floor(100 + Math.random() * 900);
    setCode(id);
    setLog(lang === "bn"
      ? `✅ রুম তৈরি হয়েছে: ${id} | AI মডারেটর নিয়ম: ১) একবারে এক প্রশ্ন, ২) সবাই লিখে তারপর আলোচনা, ৩) শেষে সংক্ষিপ্ত নোট।`
      : `✅ Room created: ${id} | Moderator rules: 1) one question at a time, 2) everyone writes then discuss, 3) end with short notes.`);
  }

  function join() {
    setLog(lang === "bn"
      ? `➡️ রুমে জয়েন: ${code} | AI: “প্রথম প্রশ্ন: Inside–Outside test কী?”`
      : `➡️ Joined room: ${code} | AI: “First question: What is the inside–outside test?”`);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <Card className="lg:col-span-5 rounded-2xl">
        <CardHeader><CardTitle className="text-base">{t.roomsDemo.header}</CardTitle><CardDescription>{t.roomsDemo.desc}</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input value={code} onChange={(e) => setCode(e.target.value)} className="rounded-2xl" />
            <Button onClick={join} className="rounded-2xl">{t.roomsDemo.join}</Button>
          </div>
          <Button onClick={create} variant="secondary" className="w-full rounded-2xl">{t.roomsDemo.create}</Button>
          <div className="rounded-2xl border bg-muted/40 p-4 text-sm">{log}</div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-7 rounded-2xl">
        <CardHeader><CardTitle className="text-base">{t.roomsDemo.guide}</CardTitle><CardDescription>{lang === "bn" ? "এখানে গ্রুপ চ্যাট/হোয়াইটবোর্ড/ফাইল শেয়ার যোগ করতে পারেন" : "You can add group chat/whiteboard/file sharing here"}</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-2xl border p-4 text-sm">
            <div className="font-semibold">{lang === "bn" ? "AI ফ্লো" : "AI flow"}</div>
            <div className="mt-2 space-y-2 text-muted-foreground">
              <div>1) {lang === "bn" ? "লক্ষ্য সেট" : "Set goal"}</div>
              <div>2) {lang === "bn" ? "প্রি-কুইজ" : "Pre-quiz"}</div>
              <div>3) {lang === "bn" ? "কনসেপ্ট + উদাহরণ" : "Concept + examples"}</div>
              <div>4) {lang === "bn" ? "প্র্যাকটিস + ফিডব্যাক" : "Practice + feedback"}</div>
              <div>5) {lang === "bn" ? "শেষে রিভিশন নোট" : "End with revision notes"}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">{lang === "bn" ? "গ্রুপ লার্নিং" : "Group learning"}</Badge>
            <Badge variant="secondary" className="rounded-full">{lang === "bn" ? "AI মডারেশন" : "AI moderation"}</Badge>
            <Badge variant="secondary" className="rounded-full">{lang === "bn" ? "এক্সাম ফোকাস" : "Exam focus"}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  const { lang, setLang, t } = useLang();

  const features = useMemo(() => [
    {
      icon: Brain,
      title: lang === "bn" ? "AI Personal Learning Brain" : "AI Personal Learning Brain",
      badge: lang === "bn" ? "কোর ইঞ্জিন" : "Core engine",
      desc: lang === "bn"
        ? "স্টুডেন্ট সম্পর্কে শিখে, লেসন অ্যাডজাস্ট করে, ভুল প্রেডিক্ট করে, এক্সাম/স্কিল অনুযায়ী পথ বানায়।"
        : "Learns the student, adapts lessons, predicts mistakes, and builds custom pathways for exams/skills.",
    },
    { icon: GraduationCap, title: lang === "bn" ? "AI Co-Teacher (BN + EN)" : "AI Co-Teacher (BN + EN)", badge: lang === "bn" ? "২৪/৭" : "24/7", desc: lang === "bn" ? "যেকোন প্রশ্নের উত্তর, বহু ভাবে ব্যাখ্যা, সহজ বাংলায় কনভার্ট, ভয়েস সাপোর্ট, ছবি/প্রশ্ন আপলোড বোঝে।" : "Anytime Q&A, multi-style explanations, Bangla simplification, voice, and photo question understanding." },
    { icon: ClipboardCheck, title: lang === "bn" ? "AI Exam Coach (BD-specific)" : "AI Exam Coach (BD-specific)", badge: lang === "bn" ? "SSC–BCS" : "SSC–BCS", desc: lang === "bn" ? "NCTB/Admission/BCS প্যাটার্ন ধরে মক বানায়, দুর্বল অধ্যায় ধরে, ভুল বিশ্লেষণ করে, স্কোর প্রেডিক্ট করে।" : "Builds mocks by NCTB/Admission/BCS patterns, detects weak chapters, analyzes mistakes, predicts score." },
    { icon: FlaskConical, title: lang === "bn" ? "AI Project Lab" : "AI Project Lab", badge: lang === "bn" ? "STEM" : "STEM", desc: lang === "bn" ? "সায়েন্স প্রজেক্ট, ফিজিক্স সিমুলেশন, কোড জেনারেশন, রিয়েল-টাইম ডিবাগিং—সব এক জায়গায়।" : "Science projects, physics sims, code generation, real-time debugging—learning becomes practical." },
    { icon: Mic, title: lang === "bn" ? "AI Voice Mentor" : "AI Voice Mentor", badge: lang === "bn" ? "লো-লিটারেসি" : "Low-literacy", desc: lang === "bn" ? "ভয়েসে লেসন, ফিডব্যাক, ডাউট সলভ—গ্রাম/স্কুল/অ্যাডাল্ট লার্নারদের জন্য দারুণ।" : "Voice lessons, feedback, doubt solving—great for rural learners and adult learners." },
    { icon: Briefcase, title: lang === "bn" ? "Skill-to-Job Pathway" : "Skill-to-Job Pathway", badge: lang === "bn" ? "পোর্টফোলিও" : "Portfolio", desc: lang === "bn" ? "স্কিল প্রগ্রেস দেখে ক্যারিয়ার ট্র্যাক সাজেস্ট, কোর্স রেকমেন্ড, পোর্টফোলিও অটো-বিল্ড, এমপ্লয়ার ম্যাচিং।" : "Recommends career tracks, courses, auto-builds portfolios, and matches learners to employers." },
    { icon: PenTool, title: lang === "bn" ? "Teacher Content Generator" : "Teacher Content Generator", badge: lang === "bn" ? "B2B গ্রোথ" : "B2B growth", desc: lang === "bn" ? "ওয়ার্কশিট, লেসন প্ল্যান, MCQ ব্যাংক, ক্লাস টেস্ট, স্লাইড, ইন্টারঅ্যাকটিভ প্রশ্ন—সব ইন্সট্যান্ট।" : "Worksheets, lesson plans, MCQ banks, class tests, slides, and interactive questions—instantly." },
    { icon: Users, title: lang === "bn" ? "AI Collaboration Rooms" : "AI Collaboration Rooms", badge: lang === "bn" ? "গ্রুপ স্টাডি" : "Group study", desc: lang === "bn" ? "স্টুডেন্টরা একসাথে পড়বে—AI মডারেটর গাইড করবে, অফ-টপিক কমাবে, এক্সাম ফোকাস রাখবে।" : "Students study together with an AI moderator that keeps the group productive and exam-focused." },
    { icon: MapPinned, title: lang === "bn" ? "Localized Learning Pathways" : "Localized Learning Pathways", badge: lang === "bn" ? "বাংলাদেশ-ফার্স্ট" : "Bangladesh-first", desc: lang === "bn" ? "PSC–HSC, Admission, BCS, Job skills, Freelancing, Olympiads—সব ট্র্যাক আলাদা করে অ্যাডাপ্টিভ প্রোগ্রেশন।" : "Separate tracks for PSC–HSC, Admission, BCS, job skills, freelancing, olympiads—adaptive progression." },
    { icon: Sparkles, title: lang === "bn" ? "Motivation + Mental Model" : "Motivation + Mental Model", badge: lang === "bn" ? "পেসিং" : "Pacing", desc: lang === "bn" ? "বোরড/কনফিউজড/দ্রুত-ধীরে—AI ধরতে পারে, তারপর টিচিং স্টাইল বদলায়।" : "Detects boredom/confusion/pace and changes teaching style accordingly." },
  ], [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-2xl border p-2"><Brain className="h-5 w-5" /></div>
            <div>
              <div className="text-sm font-semibold leading-none">{t.brand}</div>
              <div className="text-xs text-muted-foreground">{t.tagline}</div>
            </div>
          </div>

          <nav className="hidden items-center gap-5 md:flex">
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#features">{t.nav.features}</a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#demo">{t.nav.demo}</a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#teachers">{t.nav.teachers}</a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#pricing">{t.nav.pricing}</a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#faq">{t.nav.faq}</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-2xl border px-3 py-2 sm:flex">
              <Languages className="h-4 w-4" />
              <div className="text-xs text-muted-foreground">BN</div>
              <Switch checked={lang === "en"} onCheckedChange={(v) => setLang(v ? "en" : "bn")} />
              <div className="text-xs text-muted-foreground">EN</div>
            </div>
            <Button className="rounded-2xl">{lang === "bn" ? "সাইন আপ" : "Sign Up"}</Button>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 py-14">
        <div className="pointer-events-none absolute inset-x-0 top-[56px] -z-10 h-[520px]" aria-hidden>
          <div className="mx-auto h-full max-w-6xl rounded-[32px] bg-gradient-to-br from-[rgba(99,102,241,.18)] via-transparent to-[rgba(20,184,166,.14)]" />
        </div>
        <motion.div initial="hidden" animate="show" variants={container} className="grid gap-8 lg:grid-cols-12">
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full" variant="secondary">{t.hero.badge}</Badge>
              <Badge className="rounded-full" variant="outline">MVP-ready</Badge>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">{t.hero.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t.hero.subtitle}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-2xl" size="lg">{t.hero.cta1} <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button className="rounded-2xl" size="lg" variant="secondary" onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" })}>{t.hero.cta2}</Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill><ShieldCheck className="mr-2 h-3.5 w-3.5" />{t.hero.trust}</Pill>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-5">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{lang === "bn" ? "এখানে কী আছে" : "What’s inside"}</CardTitle>
                <CardDescription>{lang === "bn" ? "এক কোর ইঞ্জিন + ১০টা ইউজ কেস" : "One core engine + 10 experiences"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[ { i: Brain, t: lang === "bn" ? "লার্নিং ব্রেইন" : "Learning Brain" }, { i: GraduationCap, t: lang === "bn" ? "AI টিউটর" : "AI Tutor" }, { i: ClipboardCheck, t: lang === "bn" ? "এক্সাম কোচ" : "Exam Coach" }, { i: FlaskConical, t: lang === "bn" ? "প্রজেক্ট ল্যাব" : "Project Lab" }, { i: PenTool, t: lang === "bn" ? "টিচার টুলস" : "Teacher Tools" }, ].map((x, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-2xl border p-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border p-2"><x.i className="h-4 w-4" /></div>
                      <div className="text-sm font-medium">{x.t}</div>
                    </div>
                    <Check className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
                <div className="rounded-2xl border bg-muted/30 p-4 text-sm text-muted-foreground">
                  {lang === "bn" ? "আপনি চাইলে এটা domain/hosting এ build করে upload করে দ্রুত MVP লঞ্চ করতে পারবেন।" : "You can build & upload this to your domain/hosting to ship an MVP fast."}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <Anchor id="features" />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t.sections.featuresTitle}</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{t.sections.featuresSubtitle}</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Badge className="rounded-full" variant="secondary">RAG-ready</Badge>
            <Badge className="rounded-full" variant="secondary">Exam blueprints</Badge>
            <Badge className="rounded-full" variant="secondary">Mastery graph</Badge>
          </div>
        </div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={container} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} badge={f.badge} />)}
        </motion.div>
      </section>

      {/* Final Web-App Feature List */}
      <Anchor id="full-features" />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold tracking-tight">{lang === "bn" ? "ফাইনাল ওয়েব-অ্যাপ ফিচার লিস্ট" : "Final Web-App Feature List"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {lang === "bn" ? "স্টুডেন্ট-ফোকাসড EdTech প্ল্যাটফর্মের সম্পূর্ণ ফিচার ব্রেকডাউন (Competition-ready)" : "Complete student-focused EdTech feature breakdown (competition-ready)."}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            { title: "User Roles & Profiles", items: ["Student profile (class, board, goals, language, history)", "Parent dashboard with progress, scores & alerts"] },
            { title: "Content Structure & Navigation", items: ["Class → Subject → Chapter hierarchy", "Smart search, recent & recommended chapters"] },
            { title: "Learning Content Delivery", items: ["Structured text, video, diagrams & formulas", "Interactive 3D models & simulations"] },
            { title: "Assessment & Exam System", items: ["Chapter quizzes (MCQ, short, diagram-based)", "Timed mock exams with auto-evaluation", "Instant feedback & revision suggestions"] },
            { title: "Progress Tracking & Analytics", items: ["Chapter & syllabus progress bars", "Weak-to-strong improvement tracking"] },
            { title: "Gamification & Motivation", items: ["Daily & weekly learning streaks", "Points, rewards & leaderboards"] },
            { title: "Personalization Engine", items: ["Adaptive difficulty & learning pace", "Personalized revision & practice"] },
            { title: "User Tools", items: ["AI + manual notes", "Bookmarks, watch later & revision checklist"] },
            { title: "Subscription & Access Control", items: ["Free vs premium content", "Subject & duration-based plans", "Payment gateway integration"] },
            { title: "Admin Panel", items: ["Manage classes, content & quizzes", "Analytics & reporting"] },
            { title: "Security & System", items: ["Secure authentication & role-based access", "Data encryption & activity logging"] },
          ].map((sec, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader><CardTitle className="text-base">{sec.title}</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {sec.items.map((it, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4" /> <span>{it}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo */}
      <Anchor id="demo" />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{t.sections.demoTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t.sections.demoSubtitle}</p>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="student" className="w-full">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <TabsList className="rounded-2xl">
                <TabsTrigger value="student" className="rounded-2xl">{t.demoTabs.student}</TabsTrigger>
                <TabsTrigger value="exam" className="rounded-2xl">{t.demoTabs.exam}</TabsTrigger>
                <TabsTrigger value="lab" className="rounded-2xl">{t.demoTabs.lab}</TabsTrigger>
                <TabsTrigger value="teacher" className="rounded-2xl">{t.demoTabs.teacher}</TabsTrigger>
                <TabsTrigger value="rooms" className="rounded-2xl">{t.demoTabs.rooms}</TabsTrigger>
              </TabsList>

              <div className="flex items-center justify-between gap-3 rounded-2xl border px-4 py-2">
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  <div className="text-xs text-muted-foreground">{lang === "bn" ? "ভাষা" : "Language"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full" variant="secondary">{lang.toUpperCase()}</Badge>
                  <Button size="sm" variant="secondary" className="rounded-2xl" onClick={() => setLang(lang === "en" ? "bn" : "en")}>{lang === "bn" ? "EN" : "BN"}</Button>
                </div>
              </div>
            </div>

            <TabsContent value="student" className="mt-4"><StudentDemo t={t} lang={lang} /></TabsContent>
            <TabsContent value="exam" className="mt-4"><ExamCoachDemo t={t} lang={lang} /></TabsContent>
            <TabsContent value="lab" className="mt-4"><ProjectLabDemo t={t} lang={lang} /></TabsContent>
            <TabsContent value="teacher" className="mt-4"><TeacherToolsDemo t={t} lang={lang} /></TabsContent>
            <TabsContent value="rooms" className="mt-4"><RoomsDemo t={t} lang={lang} /></TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Teachers */}
      <Anchor id="teachers" />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl">{t.sections.teachersTitle}</CardTitle>
                <CardDescription>{lang === "bn" ? "স্কুল/কোচিং/ইন্সটিটিউশন—সবাই দ্রুত কন্টেন্ট তৈরি করতে পারবে।" : "Schools/coaching/institutions can generate content in seconds."}</CardDescription>
              </div>
              <Badge className="rounded-full" variant="secondary">{lang === "bn" ? "উচ্চ ROI" : "High ROI"}</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {[ { icon: PenTool, title: lang === "bn" ? "MCQ + CQ ব্যাংক" : "MCQ + CQ bank", desc: lang === "bn" ? "টপিক অনুযায়ী প্রশ্ন সেট + উত্তর" : "Topic-wise question sets + answers" },
              { icon: Wand2, title: lang === "bn" ? "লেসন প্ল্যান" : "Lesson plans", desc: lang === "bn" ? "ক্লাস আউটলাইন + অ্যাক্টিভিটি" : "Class outline + activities" },
              { icon: ClipboardCheck, title: lang === "bn" ? "ক্লাস টেস্ট" : "Class tests", desc: lang === "bn" ? "সময়-ভিত্তিক টেস্ট + অটো চেক" : "Timed tests + auto-check" },
            ].map((x, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><x.icon className="h-4 w-4" /> {x.title}</CardTitle>
                  <CardDescription>{x.desc}</CardDescription>
                </CardHeader>
                <CardContent><Button variant="secondary" className="w-full rounded-2xl">{lang === "bn" ? "ট্রাই করুন" : "Try it"}</Button></CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Pricing */}
      <Anchor id="pricing" />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{t.sections.pricingTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{lang === "bn" ? "এটা শুধু উদাহরণ। আপনার মার্কেট/কস্ট অনুযায়ী ঠিক করবেন।" : "Example pricing. Adjust to your market and costs."}</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[ { name: t.pricing.free, price: "৳0", perks: [lang === "bn" ? "বেসিক টিউটর" : "Basic tutor", lang === "bn" ? "ডায়াগনস্টিক (লিমিটেড)" : "Limited diagnostics", lang === "bn" ? "প্র্যাকটিস সেট" : "Practice sets"], highlight: false },
            { name: t.pricing.pro, price: "৳299", perks: [lang === "bn" ? "অ্যাডাপ্টিভ প্ল্যান" : "Adaptive plan", lang === "bn" ? "এক্সাম কোচ + মক" : "Exam coach + mocks", lang === "bn" ? "ভয়েস ব্যাখ্যা" : "Voice explanations", lang === "bn" ? "ডিটেইলড অ্যানালিটিক্স" : "Detailed analytics"], highlight: true },
            { name: t.pricing.inst, price: "Custom", perks: [lang === "bn" ? "টিচার টুলস" : "Teacher tools", lang === "bn" ? "ক্লাস ম্যানেজমেন্ট" : "Class management", lang === "bn" ? "রিপোর্টিং + API" : "Reporting + API", lang === "bn" ? "সাপোর্ট" : "Support"], highlight: false },
          ].map((p) => (
            <Card key={p.name} className={"rounded-2xl " + (p.highlight ? "border-primary" : "")}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  {p.highlight ? <Badge className="rounded-full">{lang === "bn" ? "Best" : "Best"}</Badge> : null}
                </div>
                <div className="mt-2 flex items-end gap-2">
                  <div className="text-3xl font-semibold">{p.price}</div>
                  <div className="text-xs text-muted-foreground">{p.price === "Custom" ? "" : t.pricing.perMonth}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {p.perks.map((x) => <div key={x} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4" /> <span>{x}</span></div>)}
                <Button className="mt-4 w-full rounded-2xl" variant={p.highlight ? "default" : "secondary"}>{t.pricing.cta}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <Anchor id="faq" />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{t.sections.faqTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{lang === "bn" ? "শুরু করার আগে সাধারণ প্রশ্নগুলোর উত্তর" : "Common questions before you start"}</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[ { q: t.faq.q1, a: t.faq.a1 }, { q: t.faq.q2, a: t.faq.a2 }, { q: t.faq.q3, a: t.faq.a3 } ].map((x, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader><CardTitle className="text-base">{x.q}</CardTitle></CardHeader>
              <CardContent><CardDescription className="text-sm leading-relaxed">{x.a}</CardDescription></CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm">
              <div className="font-semibold">{t.brand}</div>
              <div className="mt-1 text-xs text-muted-foreground">{t.footer.note}</div>
              <div className="mt-1 text-xs text-muted-foreground">{t.footer.built}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full" variant="secondary">Bilingual</Badge>
              <Badge className="rounded-full" variant="secondary">Adaptive</Badge>
              <Badge className="rounded-full" variant="secondary">Exam-aware</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
