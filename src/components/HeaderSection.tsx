import React from "react";

export default function HeaderSection({ title }: { title: string }) {
  return (
    <div>
      <div
        style={{
          textAlign: "left",
          color: "white",
          fontSize: 40,
          fontWeight: "bold",
          padding: 40,
        }}
      >
        {title}
      </div>
    </div>
  );
}
