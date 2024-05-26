export const toSlug = (word) => {
    return word.toLowerCase().replace(/\s+/g, '-').replaceAll("ş", "s").replaceAll("ç","c").replaceAll("ğ", "g").replaceAll("ö", "o").replaceAll("ü", "u").replaceAll("ı", "i");
}