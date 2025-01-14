import ReactDOM from 'react-dom'
import { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { ErrorBoundary } from 'react-hooks-fetch';
import { Matrix4, Euler, ShaderMaterial } from 'three'

import { Loader3DTilesR3FAsset } from './loader-3dtiles-r3f'

function App() {
  const camera = useRef(null);

  const material = new ShaderMaterial({
    transparent: true,
    opacity : 0.5
  })


  const MaximumScreenSpaceError = 24
  const ViewDistanceScale = 0.4

  const TileSets = [
    // {name : 'Orco_3M', url : './../../tileset_orco_3M.json'},
    // {name : 'Orco_3M_moderne', url : './../../tileset_orco_3M_moderne.json'},
    // {name : 'Orco', url : './../../tileset_orco_v01.json'},
    // {name : 'Orco1', url : './LoD/tileset_orco1.json'},
    {name : 'Villa de Diomede', url : './../tileset_villa_v01.json', MaximumScreenSpaceError : 18, ViewDistanceScale : 0.4}
  ]

  return (
    <div id="canvas-container">
      <Canvas style={{ background: '#272730'}}>
        <PerspectiveCamera ref={camera}>
          <ErrorBoundary fallback={
            <mesh>
              <sphereBufferGeometry />
              <meshBasicMaterial color="red" />
            </mesh>
          }>
            <Suspense fallback={
              <mesh>
                <sphereBufferGeometry />
                <meshBasicMaterial color="yellow" />
              </mesh>
            }>

              {TileSets.map((tileset, index) =>               
                <Loader3DTilesR3FAsset
                  key={index}
                  dracoDecoderPath={"https://unpkg.com/three@0.137.0/examples/js/libs/draco"}
                  basisTranscoderPath={"https://unpkg.com/three@0.137.0/examples/js/libs/basis"}
                  rotation={new Euler(-Math.PI / 2, 0, 0)}
                  name={tileset.name} 
                  url={tileset.url}              
                  //  url="https://int.nyt.com/data/3dscenes/ONA360/TILESET/0731_FREEMAN_ALLEY_10M_A_36x8K__10K-PN_50P_DB/tileset_tileset.json"
                  maximumScreenSpaceError={MaximumScreenSpaceError}
                  viewDistanceScale={ViewDistanceScale}
                />
              )} 

            </Suspense>
          </ErrorBoundary>
        </PerspectiveCamera>
        <OrbitControls camera={camera.current} />
      </Canvas>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
