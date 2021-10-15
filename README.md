Introduction
============
[Eeum Center][] is an open database of synaptical level connectome. created by [CFC, KIST][], based on [ParaView Glance][].

[Eeum Center]: https://eeum.kist.re.kr
[CFC, KIST]: http://cfc.kist.re.kr
[ParaView Glance]: https://kitware.github.io/paraview-glance/

Building
========

The prerequisites are [git][] and [node.js + npm][].

If you wish to view, enhance, or adapt this application in any way, you can access and run the freely available source code from any platform using the following commands:


```bash
$ git clone https://github.com/feng-lab/eeum.git
$ cd eeum/
$ npm install
$ npm run build
$ npm run dev
```

This will run a development build and you can visit the application at `http://localhost:9999`.

[git]: https://git-scm.com
[node.js + npm]: https://nodejs.org/en

Deploying to Production
=======================

To generate a production build, use the following commands:

```
$ npm run build:release
```

This will output the final bundle and assets to `dist/`.
You can then recursively copy all of those files into the web location of your choice.
As there is no server-side code involved, all you need is some web hosting!

If you make changes to any of the ITK filtering code under `itk/`, you should run the following
command from the root folder. For more information, check out [itk.js].

```
$ npx itk-js build itk/
```

[itk.js]: https://insightsoftwareconsortium.github.io/itk-js/examples/hello_world_node.html


License
=======

Eeum is distributed under the OSI-approved BSD 3-clause License.  See [COPYRIGHT][] and [LICENSE][] for details.

[COPYRIGHT]: COPYRIGHT
[LICENSE]: LICENSE
