export function scrollToTop(ref,isSmooth = true){
    ref.current.scrollIntoView({block: "start", inline: "nearest", behavior: isSmooth? "smooth" :"auto"});
}