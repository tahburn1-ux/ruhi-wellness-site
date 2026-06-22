import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Elements from "./pages/Elements";
import BookNow from "./pages/BookNow";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import TheScience from "./pages/TheScience";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/elements" component={Elements} />
      <Route path="/book" component={BookNow} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/the-science" component={TheScience} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
