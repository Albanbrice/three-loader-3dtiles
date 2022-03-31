Reality Capture exporte la géométrie des tilesets au format b3dm zippés, il faut donc soit configurer le serveur pour qu'il les décompresse à la volée, soit les décompresser manuellement sur la machine distante (si on y a accès par ssh), ou bien le faire en local avant l'upload

``for file in *.b3dm; do mv -- "$file" "${file%.b3dm}.b3dm.gz"; done``

``for file in *.b3dm.gz; do gunzip ${file%}; done``
