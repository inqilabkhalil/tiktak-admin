import { Button as AntButton, type ButtonProps } from 'antd';

// Diqqət: rəngi bu komponentin içində sabit yazmırıq.
// Hər kəs öz Button-unu istifadə edərkən, öz ehtiyacına uyğun rəngi
// "style" prop-u ilə özü versin (məs: Əlavə et -> yaşıl, Sil -> qırmızı).
// Bu komponent yalnız ÜMUMİ ölçüləri (radius, hündürlük) təyin edir.
export const Button = (props: ButtonProps) => {
  return (
    <AntButton
      style={{
        borderRadius: 10,
        height: 40,         
        ...props.style,    
      }}
      {...props}
    />
  );
};