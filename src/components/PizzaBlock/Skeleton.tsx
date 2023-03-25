import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = (props) => (
    <ContentLoader 
      className="pizza-block"
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="140" cy="125" r="125" /> 
      <rect x="0" y="270" rx="10" ry="10" width="280" height="27" /> 
      <rect x="0" y="420" rx="10" ry="10" width="134" height="45" /> 
      <rect x="145" y="420" rx="10" ry="10" width="134" height="45" /> 
      <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
    </ContentLoader>
  )

export default Skeleton
