import { Marquee } from "@/components/magicui/marquee";
import { useTheme } from "@/context/ThemeContext";;

const companyDark = [
    "https://cdn.brandfetch.io/apple.com/w/419/h/512/theme/light/logo?c=1idZAyvjgoWG3sM6FM9",
    "https://cdn.brandfetch.io/google.com/w/512/h/161/logo?c=1idZAyvjgoWG3sM6FM9",
    "https://cdn.brandfetch.io/meta.com/w/512/h/221/theme/light/logo?c=1idZAyvjgoWG3sM6FM9",
    "https://cdn.brandfetch.io/amazon.com/w/512/h/171/theme/light/logo?c=1idZAyvjgoWG3sM6FM9",
    "https://cdn.brandfetch.io/microsoft.com/w/512/h/512/theme/light/symbol?c=1idZAyvjgoWG3sM6FM9",
    "https://cdn.brandfetch.io/atlassian.com/w/512/h/84/logo?c=1idZAyvjgoWG3sM6FM9"
];
const companyLight = [
    "https://cdn.brandfetch.io/apple.com/w/419/h/512/logo?c=1idZAyvjgoWG3sM6FM9",
    "https://cdn.brandfetch.io/google.com/w/512/h/161/logo?c=1idZAyvjgoWG3sM6FM9",
    "https://cdn.brandfetch.io/meta.com/w/512/h/221/logo?c=1idZAyvjgoWG3sM6FM9",
    "https://cdn.brandfetch.io/amazon.com/w/512/h/171/logo?c=1idZAyvjgoWG3sM6FM9",
    "https://cdn.brandfetch.io/microsoft.com/w/512/h/512/logo?c=1idZAyvjgoWG3sM6FM9",
    "https://cdn.brandfetch.io/atlassian.com/w/512/h/84/logo?c=1idZAyvjgoWG3sM6FM9"
];

function MarqueeCard({ logo }: { logo: string }) {
  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt="Company Logo" className="h-12" />
    </div>
  );
}

function MarqueeAnimation() {
    const { theme } = useTheme();
  return (
    <div className="h-fit w-full flex flex-col items-center justify-center gap-4 px-4">
        <h4 className="scroll-m-20 text-md tracking-tight">Prepare for these Companies</h4>
        <Marquee className="w-full py-4">
            {theme === "dark" && companyDark.map((logo, index) => (
                <MarqueeCard key={index} logo={logo} />
            ))}
            {theme === "light" && companyLight.map((logo, index) => (
                <MarqueeCard key={index} logo={logo} />
            ))}
        </Marquee>
    </div>
  )
}

export default MarqueeAnimation