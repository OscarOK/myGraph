import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';

cytoscape.use(edgehandles);

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    cy;

    constructor(public toastController: ToastController, public popoverController: PopoverController) { }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 1000
        });
        toast.present();
    }

    addNode() {
        this.cy.add({
            group: 'nodes',
            data: { weight: 75 },
            position: { x: 200, y: 200 }
        });
        //this.presentPopover();
    }

    deleteNode() {
        let noneSelectedMsg = "Please, select a node or edge.";
        let deletedMsg = "Element removed successfully.";
        let element = this.cy.$(':selected');

        if (element.length == 0) {
            this.presentToast(noneSelectedMsg);
        } else {
            element.remove();
            this.presentToast(deletedMsg);
        }
    }

    ionViewWillEnter() {
        this.cy = cytoscape({
            container: document.getElementById('cy'),

            layout: {
                name: 'circle',
            },

            style: [
                {
                    selector: 'node[name]',
                    style: {
                        'content': 'data(name)'
                    }
                },

                {
                    selector: 'edge',
                    style: {
                        'curve-style': 'bezier',
                        'target-arrow-shape': 'triangle'
                    }
                },

                // some style for the extension

                {
                    selector: '.eh-handle',
                    style: {
                        'background-color': 'red',
                        'width': 12,
                        'height': 12,
                        'shape': 'ellipse',
                        'overlay-opacity': 0,
                        'border-width': 12, // makes the handle easier to hit
                        'border-opacity': 0
                    }
                },

                {
                    selector: '.eh-hover',
                    style: {
                        'background-color': 'red'
                    }
                },

                {
                    selector: '.eh-source',
                    style: {
                        'border-width': 2,
                        'border-color': 'red'
                    }
                },

                {
                    selector: '.eh-target',
                    style: {
                        'border-width': 2,
                        'border-color': 'red'
                    }
                },

                {
                    selector: '.eh-preview, .eh-ghost-edge',
                    style: {
                        'background-color': 'red',
                        'line-color': 'red',
                        'target-arrow-color': 'red',
                        'source-arrow-color': 'red'
                    }
                },

                {
                    selector: '.eh-ghost-edge.eh-preview-active',
                    style: {
                        'opacity': 0
                    }
                }
            ],

            elements: {
                nodes: [
                    { data: { id: 'j', name: 'Jerry' } },
                    { data: { id: 'e', name: 'Elaine' } },
                    { data: { id: 'k', name: 'Kramer' } },
                    { data: { id: 'g', name: 'George' } }
                ],
                edges: [
                    { data: { source: 'j', target: 'e' } },
                    { data: { source: 'j', target: 'k' } },
                    { data: { source: 'j', target: 'g' } },
                    { data: { source: 'e', target: 'j' } },
                    { data: { source: 'e', target: 'k' } },
                    { data: { source: 'k', target: 'j' } },
                    { data: { source: 'k', target: 'e' } },
                    { data: { source: 'k', target: 'g' } },
                    { data: { source: 'g', target: 'j' } }
                ]
            }
        });

        //        var eh = cy.edgehandles();
    }
}
